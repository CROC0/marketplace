import React from 'react';

import { useStoreActions } from '../../../store/hooks';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const Theme = () => {
  const classes = useStyles();

  const setTheme = useStoreActions((state) => state.palette.changeTheme);
  return (
    <Box display='flex' alignItems='center' padding={3}>
      <Box flexGrow={1}>
        <Typography variant='h5' color='primary'>
          Theme
        </Typography>
        <Typography variant='body2' color='secondary'>
          Select your theme colour
        </Typography>
      </Box>
      <Box className={classes.buttonBox}>
        <Button className={classes.blueButton} onClick={() => setTheme('blue')}>
          Blue
        </Button>
        <Button className={classes.cyanButton} onClick={() => setTheme('cyan')}>
          Cyan
        </Button>
        <Button className={classes.pinkButton} onClick={() => setTheme('pink')}>
          Pink
        </Button>
        <Button className={classes.darkButton} onClick={() => setTheme('dark')}>
          Dark
        </Button>
      </Box>
    </Box>
  );
};

export default Theme;
