import { makeStyles, Theme } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import cyan from '@material-ui/core/colors/cyan';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

export default makeStyles((theme: Theme) => ({
  buttonBox: {
    '& button': {
      margin: theme.spacing(0.5),
    },
  },
  cyanButton: {
    backgroundColor: cyan[400],
    color: theme.palette.getContrastText(cyan[400]),
    '&:hover': {
      backgroundColor: cyan[600],
    },
  },
  blueButton: {
    backgroundColor: blue[800],
    color: theme.palette.getContrastText(blue[800]),
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
  pinkButton: {
    backgroundColor: pink[400],
    color: theme.palette.getContrastText(pink[400]),
    '&:hover': {
      backgroundColor: pink[500],
    },
  },
  darkButton: {
    backgroundColor: grey['A700'],
    color: theme.palette.getContrastText(grey['A700']),
    '&:hover': {
      backgroundColor: grey[500],
    },
  },
}));
