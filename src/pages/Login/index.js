import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// core components

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import { Link } from 'react-router-dom';

import loginPageStyle from 'assets/jss/material-kit-pro-react/views/loginPageStyle.js';

import image from 'assets/img/bg7.jpg';
import firebase from '../firebase';

const useStyles = makeStyles(loginPageStyle);

export default function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader
                  color="primary"
                  signup
                  className={classes.cardHeader}
                >
                  <h4 className={classes.cardTitle}>Login</h4>
                </CardHeader>

                <CardBody signup>
                  <CustomInput
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: 'Email...',
                      type: 'email',
                      value: email,
                      onChange: e => setEmail(e.target.value),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: 'Password',
                      type: 'password',
                      value: password,
                      onChange: e => setPassword(e.target.value),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon className={classes.inputIconsColor}>
                            lock_utline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: 'off'
                    }}
                  />
                  <Link to="/forgotpass" className={classes.link}>
                    Forgot Password?
                  </Link>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={login}
                    className={classes.submit}
                  >
                    Login
                  </Button>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="info"
                    component={Link}
                    to="/register"
                    className={classes.submit}
                  >
                    Register
                  </Button>
                </CardBody>
                <div className={classes.textCenter}>
                  <span>
                    <p></p>
                  </span>
                </div>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );

  async function login() {
    try {
      await firebase.login(email, password);
      props.history.replace('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
}
