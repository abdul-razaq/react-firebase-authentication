import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    // Initialize firebase with the configuration
    firebase.initializeApp(config);
    // Instantiate the firebase auth api
    this.auth = firebase.auth();
    this.database = firebase.database();
  }

  // AUTH API
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // Merge Auth and DB User API logic.
  onAuthUserListener = (next, fallback) => {
    // set a listener for when the authenticated user changes
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // if the authUser is not null and a user is authenticated, fetch the user data
        this.getUser(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };
  // User API
  // get a reference to a user by user identifier (uid)
  getUser = uid => this.database.ref(`users/${uid}`);
  // get a reference to all users
  getAllUsers = () => this.database.ref('users');
}

export default Firebase;
