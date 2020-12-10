import { createStore, createTypedHooks } from 'easy-peasy';
import { loginModel } from 'src/models/LoginModel';
import { todosModel } from 'src/models/TodosModel';
import { StoreTypes } from 'src/types';

export const store = createStore({
  login: loginModel,
  app: todosModel,
});

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<StoreTypes.StoreModel>();
