import { Action, action } from 'easy-peasy';
import jwtDecode from 'jwt-decode';

interface IToken {
  userId: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IAuth extends IToken {
  token: string;
}

export interface IAuthModel {
  user: IAuth | null;
  login: Action<IAuthModel, string>;
  logout: Action<IAuthModel>;
}

const setInitialState = (): IAuth | null => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    const decodedToken: IToken = jwtDecode(token);
    if (!(decodedToken.exp * 1000 < Date.now())) {
      return {
        ...decodedToken,
        token,
      };
    }
  }
  localStorage.removeItem('jwtToken');
  return null;
};

const authModel: IAuthModel = {
  user: setInitialState(),
  login: action((state, payload: string) => {
    localStorage.setItem('jwtToken', payload);
    const decodedToken: IToken = jwtDecode(payload);
    state.user = { ...decodedToken, token: payload };
  }),
  logout: action((state) => {
    localStorage.removeItem('jwtToken');
    state.user = null;
  }),
};

export default authModel;
