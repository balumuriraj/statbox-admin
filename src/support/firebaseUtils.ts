// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import * as firebaseui from 'firebaseui';
import { getUsersCount, grantAdminAccess } from '@/api';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCFNSA0vXoLEpkbgOvJzi6WWiHMcLjoSl8',
  authDomain: 'statbox89.firebaseapp.com',
  databaseURL: 'https://statbox89.firebaseio.com',
  projectId: 'statbox89',
  storageBucket: 'statbox89.appspot.com',
  messagingSenderId: '472325102202',
};
firebase.initializeApp(config);

// Create a root reference
const storageRef = firebase.storage().ref();
const imgPrefix = 'https://storage.googleapis.com/statbox89.appspot.com';

export async function uploadImage(path: string, file: File): Promise<string> {
  const imageRef = storageRef.child(path);
  await imageRef.put(file);
  return `${imgPrefix}/${path}`;
}

export async function deleteImage(path: string): Promise<void> {
  const imageRef = storageRef.child(path);
  let url = null;

  try {
    url = await imageRef.getDownloadURL();
  } catch (err) {
    // file doesn't exist
  }

  if (url) {
    await imageRef.delete();
  }
}

export async function initAuthObserver(context: any) {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      if (!context.$store.state.isLoggedIn) {
        try {
          const token = await user.getIdToken(/* forceRefresh */ true);

          if (!token) {
            throw new Error('Not Allowed');
          }

          const count = await getUsersCount(token);

          if (count === 0) {
            await grantAdminAccess(user.email, token);
          }

          const result = await user.getIdTokenResult(true);

          if (result && result.claims && result.claims.admin) {
            context.$store.dispatch('setAuth', { isLoggedIn: true, error: null, isLoading: false });
            context.$router.push('/');
          } else {
            throw new Error('Nice Try!');
          }
        } catch (error) {
          // Error
          let errMsg = error.message;

          if (error.response && error.response.data) {
            errMsg = error.response.data;
          }

          context.$store.dispatch('setAuth', { isLoggedIn: false, error: errMsg, isLoading: false });
        }
      }
    } else {
      context.$store.dispatch('setAuth', { isLoggedIn: false, error: null, isLoading: false });
    }

    const requireAuth = context.$route.matched.some((record: any) => record.meta.requireAuth);

    if (requireAuth && !user) {
      context.$router.push('/login');
    }
  });
}

export async function logoutFirebaseUser() {
  await firebase.auth().signOut();
  sessionStorage.removeItem('store');
}

// window.onunload = () => {
//   logoutFirebaseUser();
// };

export function firebaseLogin(context: any) {
  const provider = new firebase.auth.GoogleAuthProvider();
  context.$store.dispatch('setAuth', { isLoggedIn: false, error: null, isLoading: true });
  firebase.auth().signInWithRedirect(provider);
}

export async function getToken(force: boolean = false) {
  const user = firebase.auth().currentUser;

  if (!user) {
    return null;
  }

  return await user.getIdToken(force);
}
