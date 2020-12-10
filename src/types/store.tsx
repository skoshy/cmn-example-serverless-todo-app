import { Action, Thunk } from "easy-peasy";

export interface Todo {
  id: string;
  task: string;
  is_completed: boolean;
}

export interface LoginModel {
  user: any;

  // public methods
  logInOrSignUp: Thunk<LoginModel, [string, string]>

  // private methods
  _setUser: Action<LoginModel, any>
}

export interface TodosModel {
  todos: Record<string, Partial<Todo>>;

  // public methods
  fetchTodos: Thunk<TodosModel>
  addTodo: Thunk<TodosModel>
  editTodo: Thunk<TodosModel, [string, Partial<Todo>]>
  deleteTodo: Thunk<TodosModel, string>

  // private
  _upsertTodo: Thunk<TodosModel, [string, Partial<Todo>]>
  _deleteTodo: Thunk<TodosModel, string>
  _setTodos: Action<TodosModel, Record<string, Todo>>
  _deleteTodoLocally: Action<TodosModel, string>
  _setTodoLocally: Action<TodosModel, [string, Partial<Todo>]>
}

export interface StoreModel {
  login: LoginModel,
  app: TodosModel,
}
