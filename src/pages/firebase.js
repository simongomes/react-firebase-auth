import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
  resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  setInitialData(level) {
    if (!this.auth.currentUser) {
      return alert('Not authorized');
    }
    return this.db.doc(`users_data/${this.auth.currentUser.uid}`).set({
      name: this.auth.currentUser.displayName,
      level,
      points: 0
    });
  }

  setLevel(level) {
    if (!this.auth.currentUser) {
      return alert('Not authorized');
    }
    return this.db.doc(`users_data/${this.auth.currentUser.uid}`).set({
      level
    });
  }

  async setPoints(points) {
    if (!this.auth.currentUser) {
      return alert('Not authorized');
    }
    const setPoint = await this.db
      .doc(`users_data/${this.auth.currentUser.uid}`)
      .set({
        points: points
      });
    return setPoint;
  }

  async updateUserData(updatedData) {
    if (!this.auth.currentUser) {
      return alert('Not authorized');
    }
    const setPoint = await this.db
      .doc(`users_data/${this.auth.currentUser.uid}`)
      .set(updatedData);

    return setPoint;
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserLevel() {
    const userData = await this.db
      .doc(`users_data/${this.auth.currentUser.uid}`)
      .get();
    return userData.get('level');
  }

  async getCurrentUserPoints() {
    const userData = await this.db
      .doc(`users_data/${this.auth.currentUser.uid}`)
      .get();
    return userData.get('points');
  }

  async incrementPoint() {
    const userData = await this.db
      .doc(`users_data/${this.auth.currentUser.uid}`)
      .get();

    const updatedData = {
      name: userData.get('name'),
      level: userData.get('level'),
      points: userData.get('points') + 1
    };
    await this.updateUserData(updatedData);
    const getPoints = await this.getCurrentUserPoints();
    return getPoints;
  }

  async decrementPoint() {
    const userData = await this.db
      .doc(`users_data/${this.auth.currentUser.uid}`)
      .get();
    const updatedData = {
      name: userData.get('name'),
      level: userData.get('level'),
      points: userData.get('points') ? userData.get('points') - 1 : 0
    };
    await this.updateUserData(updatedData);
    const getPoints = await this.getCurrentUserPoints();
    return getPoints;
  }
}

export default new Firebase();
