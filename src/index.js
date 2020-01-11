import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

const firebaseInstance = new Firebase();

const rootApp = (
  <FirebaseContext.Provider value={firebaseInstance}>
    <App />
  </FirebaseContext.Provider>
)


ReactDOM.render(rootApp, document.querySelector('#root'));
