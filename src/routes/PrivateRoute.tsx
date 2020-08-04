import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from '../store/hooks';

interface IAuthRoute {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const AuthRoute: React.FC<IAuthRoute> = ({ component: Component, ...rest }): JSX.Element => {
  const user = useStoreState((state) => state.auth.user);

  return (
    <Route
      {...rest}
      render={(props) => (!user ? <Redirect to='/login' /> : <Component {...props} />)}
    />
  );
};

export default AuthRoute;
