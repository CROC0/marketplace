import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

import Profile from '../components/Profile';
import Mapbox from '../components/Mapbox';

const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={Mapbox} exact path='/mapbox' />
        <PrivateRoute component={Home} exact path='/' />
        <AuthRoute component={Login} exact path='/login' />
        <AuthRoute component={Register} exact path='/register' />

        <PrivateRoute component={Profile} exact path='/account/profile' />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
