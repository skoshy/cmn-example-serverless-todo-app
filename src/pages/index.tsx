import 'twin.macro';
import { useState } from "react";
import MainLayout from "src/layouts/MainLayout";
import { cc } from "src/lib";
import { Modal, Button, Grid, Heading, TextInput } from "src/components/_lib_";
import { useStoreState, useStoreActions } from 'src/models';
import { TodosContainer } from 'src/components/TodosContainer';

/* Use this as your starting point for your app! */

const pageTitle = "My Todo App";

const Page = ({ className }) => {
  const [userName, setUserName] = useState('user@test.com');
  const [password, setPassword] = useState('pass');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const user = useStoreState(s => s.login.user);
  const logInOrSignUp = useStoreActions(a => a.login.logInOrSignUp);
  const fetchTodos = useStoreActions(a => a.app.fetchTodos);

  return (
    <MainLayout
      pageTitle={pageTitle}
      className={cc([`bg-black bg-white bg-black`, className])}
    >
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Grid>
          <TextInput value={userName} onChange={e => setUserName((e.target as HTMLInputElement).value)} label="Username" />
          <TextInput value={password} onChange={e => setPassword((e.target as HTMLInputElement).value)} label="Password" />
          <Button
            onClick={async () => {
              await logInOrSignUp([userName, password]);
              setIsModalOpen(false);
              await fetchTodos();
            }}>
            Signup/Login
          </Button>
        </Grid>
      </Modal>
      <Grid tw="gap-6">
        <Heading level="1">{pageTitle}</Heading>
        {user ? <TodosContainer /> : (
          <Button onClick={() => setIsModalOpen(true)}>Login / Signup</Button>
        )}

      </Grid>
    </MainLayout>
  );
};

export default Page;
