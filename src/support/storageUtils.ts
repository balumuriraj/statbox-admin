// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
import 'firebase/storage';

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
