import { createMuiTheme } from '@material-ui/core/styles';

import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';

const genericTheme = {
  background: {
    default: 'rgb(241,241,241)',
    paper: '#fff',
  },
};

export const pinkTheme = createMuiTheme({
  palette: {
    ...genericTheme,
    primary: {
      main: pink[300],
    },
    secondary: {
      main: grey[700],
    },
  },
});

export const cyanTheme = createMuiTheme({
  palette: {
    ...genericTheme,
    primary: {
      main: cyan[400],
    },
    secondary: {
      main: yellow[400],
    },
    background: {
      paper: grey[600],
      default: grey[800],
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const blueTheme = createMuiTheme({
  palette: {
    ...genericTheme,
  },
});
