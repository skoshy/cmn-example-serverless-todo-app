import { entries } from 'lodash';
import { useStoreActions, useStoreState } from "src/models";
import { TodoRow } from 'src/components/TodoRow';
import { Modal, Button, Grid, Heading, Select, TextInput } from "src/components/_lib_";


export const TodosContainer = () => {
  const todos = useStoreState(state => state.app.todos);
  const addTodo = useStoreActions(a => a.app.addTodo);

  return <>
    {entries(todos).map(([todoId, todo]) => (
      <TodoRow key={todoId} todo={todo} />
    ))}
    <Button onClick={addTodo}>Add a todo</Button>
  </>
};
