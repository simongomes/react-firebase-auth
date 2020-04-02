import React, { useState, useEffect } from 'react';
import './styles.css';
import HomePage from '../HomePage';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import ForgotPassword from '../ForgotPassword';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import firebase from '../firebase';

import 'assets/scss/material-kit-pro-react.scss?v=1.8.0';

const theme = createMuiTheme();

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  var hist = createBrowserHistory();

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={hist}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/forgotpass" component={ForgotPassword} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
