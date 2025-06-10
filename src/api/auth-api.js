import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { getUserData } from './expense-api';

export const signUpUser = async ({ email, password }) => {
  try {
    const res = await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firestore().collection('users').doc(result.user.uid).set({
          email,
        });
        return result.user.uid;
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return { error: 'That email address is already in use!' };
        }

        if (error.code === 'auth/invalid-email') {
          return { error: 'That email address is invalid!' };
        }

        console.error(error);
      });
    return res;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const data = await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => getUserData(user.uid));
    return { data };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const logoutUser = () => {
  auth().signOut();
};
