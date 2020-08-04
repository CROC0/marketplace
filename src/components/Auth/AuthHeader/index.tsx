import React from 'react';
import Typography from '@material-ui/core/Typography';

const AuthHeader = () => {
  return (
    <>
      <Typography variant='h4' align='center' component='h1' gutterBottom>
        <span role='img' aria-label='croc'>
          🐊
        </span>{' '}
        Croc's World{' '}
        <span role='img' aria-label='croc'>
          🐊
        </span>
      </Typography>
      <Typography variant='h5' align='center' component='h2' gutterBottom>
        Marketplace
      </Typography>
    </>
  );
};

export default AuthHeader;
