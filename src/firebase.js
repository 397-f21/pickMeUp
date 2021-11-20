import { initializeApp } from 'firebase9/app';
import { getDatabase, onValue, ref, set, push, update, remove } from 'firebase9/database';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase9/auth';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyAnhSevAkWPjJrUq_u64p0tRiWyuY8yOfY",
  authDomain: "pickmeup-58c4e.firebaseapp.com",
  databaseURL: "https://pickmeup-58c4e-default-rtdb.firebaseio.com",
  projectId: "pickmeup-58c4e",
  storageBucket: "pickmeup-58c4e.appspot.com",
  messagingSenderId: "377889989363",
  appId: "1:377889989363:web:e306d689d3358d42ba0d86",
  measurementId: "G-WRWZ4S88ZM"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();


  useEffect (() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const getRefByPush = (path) => (
  push(ref(database, path))
)

export const updateData = (childRef, value) => (
  update(childRef, value)
)

export const updateDataByPath = (path, value)=> (
  update(ref(database, path), value)
);

export const deleteData = (path) => (
  remove(ref(database, path))
);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(), setUser);
  }, []);

  return [user];
};
