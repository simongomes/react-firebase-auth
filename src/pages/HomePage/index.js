/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import Favorite from '@material-ui/icons/Favorite';
import Face from '@material-ui/icons/Face';
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

const useStyles = makeStyles(loginPageStyle);

export default function HomePage() {
  const classes = useStyles();
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
                  <h4 className={classes.cardTitle}>Welcome Guest</h4>
                </CardHeader>

                <CardBody signup>
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
                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    component={Link}
                    to="/login"
                    className={classes.submit}
                  >
                    Login
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
}
