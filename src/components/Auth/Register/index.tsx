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
import { REGISTER_USER_MUTATION } from '../../../apollo/queries';

import { useStyles } from './styles';
import { useStoreActions } from '../../../store/hooks';
import AuthHeader from '../AuthHeader';
import Copyright from '../../Copyright';
import validate from './validator';

export interface IRegisterState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IMutation {
  registerUser: {
    token: string;
  };
}

const initialState: IRegisterState = { username: '', email: '', password: '', confirmPassword: '' };

const Register: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = useState<IRegisterState>(initialState);
  const [error, setError] = useState<IRegisterState>(initialState);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const loginAction = useStoreActions((state) => state.auth.login);

  const [startRegister, { loading }] = useMutation<IMutation, IRegisterState>(
    REGISTER_USER_MUTATION,
    {
      update(_, { data }) {
        if (data) {
          loginAction(data.registerUser.token);
        } else {
          setError({
            username: ' ',
            email: ' ',
            confirmPassword: ' ',
            password: 'Invalid credentials. Please try again.',
          });
        }
      },
      onError(err) {
        console.error(err.message);
        if (err.message === 'Email already exists') {
          setError({
            ...error,
            email: err.message,
          });
        } else if (err.message === 'Username already exists') {
          setError({
            ...error,
            username: err.message,
          });
        }
      },
    }
  );

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
      startRegister({ variables: state });
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
                id='username'
                label='Username'
                name='username'
                helperText={error.username}
                error={!!error.username}
                onChange={(e) => handleChange(e)}
                value={state.username}
              />
            </Grid>
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
            <Grid item sm={6} xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type={'password'}
                id='password'
                helperText={error.password}
                error={!!error.password}
                onChange={(e) => handleChange(e)}
                value={state.password}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type={'password'}
                id='confirmPassword'
                helperText={error.confirmPassword}
                error={!!error.confirmPassword}
                onChange={(e) => handleChange(e)}
                value={state.confirmPassword}
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
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/login' variant='body2' component={RouterLink}>
                Already have an account? Sign In
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

export default Register;
