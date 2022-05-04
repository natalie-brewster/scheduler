// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBXPUlfvM46--_lvEzIyN7gEaD1yu-8EIM",
    authDomain: "scheduler-7197c.firebaseapp.com",
    databaseURL: "https://scheduler-7197c-default-rtdb.firebaseio.com",
    projectId: "scheduler-7197c",
    storageBucket: "scheduler-7197c.appspot.com",
    messagingSenderId: "426998049797",
    appId: "1:426998049797:web:16db4f7eab41e855f6406c",
    measurementId: "G-G0PP3FS063"
  };
  
  export const setData = (path, value) => (
    database.ref(path).set(value)
  );

  const firebase = initializeApp(firebaseConfig);
  const database = getDatabase(firebase);
  
  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) console.log(`loading ${path}`);
  
      return onValue(
        dbRef,
        (snapshot) => {
          const val = snapshot.val();
          if (devMode) console.log(val);
          setData(transform ? transform(val) : val);
          setLoading(false);
          setError(null);
        },
        (error) => {
          setData(null);
          setLoading(false);
          setError(error);
        }
      );
    }, [path, transform]);
  
    return [data, loading, error];
  };
