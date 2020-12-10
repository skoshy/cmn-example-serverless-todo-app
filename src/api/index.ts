import { supabase } from 'src/api/client';

export const logInOrSignUp = async (email, password) => {
  let id, session, error;

  try {
    let response = await supabase.public.auth.signIn({
      email,
      password,
    });

    if (response.error) {
      response = await supabase.public.auth.signUp({
        email,
        password,
      });
    }

    id = response.user.id;
    session = await supabase.public.auth.getSessionFromUrl({ storeSession: true });
  } catch (e) {
    console.error(e);
    error = 'Failed';
  } finally {
    return {
      id,
      email,
      session,
      error,
    };
  }
};

export const getTodos = async () => {
  return supabase.public
    .from('todos')
    .select(`
      id, task, is_complete, inserted_at
  `);
};

export const upsertTodo = async ({ id, task, is_complete }) => {
  const user_id = supabase.public.auth.user().id;
  return supabase.public
    .from('todos')
    .insert([{ id, task, is_complete, user_id }], { upsert: true })
};

export const deleteTodo = async (id) => {
  return supabase.public
    .from('todos')
    .delete()
    .eq('id', id)
};
