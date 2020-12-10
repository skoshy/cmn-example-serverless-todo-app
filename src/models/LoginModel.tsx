import { action, thunk } from "easy-peasy";
import { logInOrSignUp } from "src/api";
import { StoreTypes } from "src/types";

export const loginModel: StoreTypes.LoginModel = {
  user: null,

  logInOrSignUp: thunk(async (actions, [username, password]) => {
    const user = await logInOrSignUp(username, password);
    actions._setUser(user);
    return user;
  }),

  _setUser: action((state, user) => {
    state.user = user;
  }),
};
