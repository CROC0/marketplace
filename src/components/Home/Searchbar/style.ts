import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(6),
    backgroundColor: theme.palette.primary.light,
  },
  control: {
    flexGrow: 1,
  },
  input: {},
  addButton: {
    display: 'none',
    marginLeft: theme.spacing(4),
    [theme.breakpoints.up(600)]: {
      display: 'block',
    },
  },
  mobileAddButton: {
    display: 'block',
    [theme.breakpoints.up(600)]: {
      display: 'none',
    },
  },
}));
