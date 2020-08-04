import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import ThemePicker from './ThemePicker';
import useStyles from './styles';

const Profile: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Box margin={3}>
        <Paper>
          <ThemePicker />
          <Divider />
          <ThemePicker />
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
