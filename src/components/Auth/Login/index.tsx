import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Grid,
  Button,
  FormControlLabel,
  Container,
  Checkbox,
  Box,
  TextField,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '../../../apollo/queries';

import { useStyles } from './styles';
import { useStoreActions } from '../../../store/hooks';
import AuthHeader from '../AuthHeader';
import Copyright from '../../Copyright';
import validate from './validator';

export interface ILoginState {
  email: string;
  password: string;
}

interface IMutation {
  loginUser: {
    token: string;
  };
}

const Login: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = useState<ILoginState>({ email: '', password: '' });
  const [error, setError] = useState<ILoginState>({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const loginAction = useStoreActions((state) => state.auth.login);

  const [startLogin, { loading }] = useMutation<IMutation, ILoginState>(LOGIN_USER_MUTATION, {
    update(_, { data }) {
      if (data) {
        loginAction(data.loginUser.token);
      } else {
        setError({ email: ' ', password: 'Invalid credentials. Please try again.' });
      }
    },
    onError(err) {
      console.error(err.message);
      if (err.message === 'UserInputError: Invalid credentials') {
        setError({ email: ' ', password: 'Invalid credentials. Please try again.' });
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { errors, isValid } = validate(state);

    if (isValid) {
      startLogin({ variables: state });
    } else {
      setError(errors);
    }
  };

  return (
    <Container maxWidth='xs'>
      <div className={classes.paper}>
        <AuthHeader />

        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
          autoComplete='off'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                helperText={error.email}
                error={!!error.email}
                onChange={(e) => handleChange(e)}
                value={state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                helperText={error.password}
                error={!!error.password}
                onChange={(e) => handleChange(e)}
                value={state.password}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='rememberMe' color='primary' />}
                label='Remember me'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/register' variant='body2' component={RouterLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' variant='body2' component={RouterLink}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
