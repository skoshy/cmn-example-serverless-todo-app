import "twin.macro"; // include when using tw prop, @TODO: maybe make an eslint plugin for this?
import { Grid, TextInput } from "src/components/_lib_";
import { useStoreActions } from "src/models";


export const TodoRow = ({ todo }) => {
  const editTodo = useStoreActions(a => a.app.editTodo);

  return <Grid tw="items-center" style={{ gridTemplateColumns: 'auto 1fr' }}>
    <input tw="h-10 w-10" type="checkbox" checked={todo.is_complete} onChange={e => {
      editTodo([todo.id, { id: todo.id, is_complete: !todo.is_complete }])
    }} />
    <TextInput inputProps={{ className: todo.is_complete ? 'line-through' : '' }} value={todo.task} onChange={e => {
      editTodo([todo.id, { id: todo.id, task: (e.target as HTMLInputElement).value }])
    }} />
  </Grid>;
};
