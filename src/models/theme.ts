import { Action, action } from 'easy-peasy';

import { blueTheme, pinkTheme, cyanTheme, darkTheme } from '../theme';
import { Theme } from '@material-ui/core/styles';

export interface IPaletteModel {
  theme: Theme;
  changeTheme: Action<IPaletteModel, string>;
}

const stringToTheme = (theme: string): Theme => {
  switch (theme) {
    case 'pink':
      return pinkTheme;
    case 'cyan':
      return cyanTheme;
    case 'blue':
      return blueTheme;
    case 'dark':
      return darkTheme;
    default:
      return blueTheme;
  }
};

const setInitialState = (): Theme => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    return stringToTheme(theme);
  }
  return blueTheme;
};

const paletteModel: IPaletteModel = {
  theme: setInitialState(),
  changeTheme: action((state, payload) => {
    localStorage.setItem('theme', payload);
    state.theme = stringToTheme(payload);
  }),
};

export default paletteModel;
