import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Battery90Icon from '@material-ui/icons/Battery90';
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

export default function Register(props) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');

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
                  <h4 className={classes.cardTitle}>Register</h4>
                </CardHeader>

                <CardBody signup>
                  <form
                    className={classes.form}
                    onSubmit={e => e.preventDefault() && false}
                  >
                    <CustomInput
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: 'Name',
                        type: 'text',
                        value: name,
                        onChange: e => setName(e.target.value),
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: 'Email',
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
                      id="level"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: 'Level',
                        type: 'text',
                        value: level,
                        onChange: e => setLevel(e.target.value),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Battery90Icon
                              className={classes.inputIconsColor}
                            />
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

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="info"
                      onClick={onRegister}
                      className={classes.submit}
                    >
                      Register
                    </Button>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/login"
                      className={classes.submit}
                    >
                      Go Back To Login
                    </Button>
                  </form>
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

  async function onRegister() {
    try {
      await firebase.register(name, email, password);
      await firebase.setInitialData(level);
      props.history.replace('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
}
