import React, { useEffect, useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import { CircularProgress } from '@material-ui/core';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import Parallax from 'components/Parallax/Parallax.js';
import Clearfix from 'components/Clearfix/Clearfix.js';
import Button from 'components/CustomButtons/Button.js';

import christian from 'assets/img/faces/christian.jpg';

import profilePageStyle from 'assets/jss/material-kit-pro-react/views/profilePageStyle.js';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import firebase from '../firebase';

const useStyles = makeStyles(profilePageStyle);

export default function Dashboard(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [progress, setProgress] = useState(true);
  const [level, setLevel] = useState('');
  const [points, setPoints] = useState('');

  useEffect(() => {
    firebase.getCurrentUserLevel().then(setLevel);
    firebase.getCurrentUserPoints().then(points => {
      setPoints(points);
      setProgress(false);
    });
  }, []);

  if (!firebase.getCurrentUsername()) {
    // not logged in
    //alert('Please login first');
    props.history.replace('/login');
    return null;
  }

  return (
    <div>
      <Parallax
        image={require('assets/img/examples/city.jpg')}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div>
                  <img src={christian} alt="..." className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>
                    {firebase.getCurrentUsername()}
                  </h3>
                  {progress ? (
                    <div className={classes.progress}>
                      <CircularProgress color="secondary" />
                    </div>
                  ) : null}

                  {!progress ? (
                    <div>
                      <h6>DESIGNER</h6>
                      <h3>Level: {level}</h3>

                      <h3>Points: {points}</h3>

                      <div className={classes.actions}>
                        <AddCircle color="secondary" onClick={increment} />
                        <RemoveCircle color="secondary" onClick={decrement} />
                      </div>
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    onClick={logout}
                    className={classes.submit}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </GridItem>
          </GridContainer>
          <div>
            <p></p>
          </div>
          <Clearfix />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}></div>
            <div className={classes.right}></div>
          </div>
        }
      />
    </div>
  );

  async function logout() {
    await firebase.logout();
    props.history.push('/');
  }

  function increment() {
    firebase.incrementPoint().then(getPoints => {
      setPoints(getPoints);
    });
  }
  function decrement() {
    firebase.decrementPoint().then(getPoints => {
      setPoints(getPoints);
    });
  }
}
