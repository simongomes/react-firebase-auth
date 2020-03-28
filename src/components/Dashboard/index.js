import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';

import { AddCircle, RemoveCircle } from '@material-ui/icons';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  action: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center'
  },
  progress: {
    paddingTop: 50,
    paddingBottom: 50
  }
});

function Dashboard(props) {
  const { classes } = props;

  if (!firebase.getCurrentUsername()) {
    // not logged in
    //alert('Please login first');
    props.history.replace('/login');
    return null;
  }

  const [progress, setProgress] = useState(true);
  const [level, setLevel] = useState('');
  const [points, setPoints] = useState('');

  useEffect(() => {
    firebase.getCurrentUserLevel().then(setLevel);
    firebase.getCurrentUserPoints().then(points => {
      setPoints(points);
      setProgress(false);
    });
  });

  return (
    <main className={classes.main}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Hello {firebase.getCurrentUsername()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>

        {progress ? (
          <div className={classes.progress}>
            <CircularProgress color="secondary" />
          </div>
        ) : null}

        {!progress ? (
          <>
            <Typography component="h1" variant="headline">
              Level: {level}
            </Typography>

            <Typography component="h1" variant="headline">
              Points: {points}
            </Typography>

            <div className={classes.actions}>
              <AddCircle color="secondary" onClick={increment} />
              <RemoveCircle color="secondary" onClick={decrement} />
            </div>
          </>
        ) : null}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={logout}
          className={classes.submit}
        >
          Logout
        </Button>
      </Paper>
    </main>
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

export default withRouter(withStyles(styles)(Dashboard));
