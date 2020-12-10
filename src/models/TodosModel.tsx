import { action, thunk } from "easy-peasy";
import uuidGen from 'uuid-random';
import { keyBy, debounce } from 'lodash';
import { deleteTodo, getTodos, upsertTodo } from "src/api";
import { StoreTypes } from "src/types";

const createNewTodo = ({ id = '', task = '', is_completed = false }): StoreTypes.Todo => ({
  id,
  task,
  is_completed,
})

const debounced = {
  upserts: {},
};

export const todosModel: StoreTypes.TodosModel = {
  todos: {},

  fetchTodos: thunk(async (actions) => {
    const { body: todosArray } = await getTodos();
    const todos = keyBy(todosArray, (o) => o.id);
    actions._setTodos(todos);
  }),
  addTodo: thunk(async (actions) => {
    // create the todo locally
    const id = uuidGen();
    const newTodo = createNewTodo({ id });
    return actions._upsertTodo([id, newTodo]);
  }),
  editTodo: thunk(async (actions, [id, todo]) => {
    return actions._upsertTodo([id, todo]);
  }),
  deleteTodo: thunk(async (actions, id) => {
    actions._deleteTodo(id);
  }),

  _upsertTodo: thunk(async (actions, [id, newTodo], { getState }) => {
    actions._setTodoLocally([id, newTodo]);

    debounced.upserts[id] = debounced.upserts[id] || debounce(upsertTodo, 1000);

    const oldTodo = getState().todos[id] ?? {};
    return debounced.upserts[id]({ ...oldTodo, ...newTodo });
  }),
  _setTodos: action((state, payload) => {
    state.todos = payload;
  }),
  _setTodoLocally: action((state, [id, newTodo]) => {
    state.todos[id] = { ...(state.todos[id] ?? {}), ...newTodo };
  }),
  _deleteTodo: thunk(async (actions, id) => {
    actions._deleteTodoLocally(id);

    // persist it also to the server
    return deleteTodo(id);
  }),
  _deleteTodoLocally: action((state, id) => {
    delete state.todos[id];
  }),
};
