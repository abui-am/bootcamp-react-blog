// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAMxmlMOZa4Cu4vKMIT_4G1rnv3aFvSLQw',
  authDomain: 'blog-64bc9.firebaseapp.com',
  projectId: 'blog-64bc9',
  storageBucket: 'blog-64bc9.appspot.com',
  messagingSenderId: '853716697474',
  appId: '1:853716697474:web:e1c427cbbfe21852504f9b',
  measurementId: 'G-Y9KKJCF532',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;
