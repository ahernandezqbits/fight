// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPYLNYNp2rbQVLQqcShq-De3Y-rcpzbwE",
  authDomain: "fight-2024.firebaseapp.com",
  projectId: "fight-2024",
  storageBucket: "fight-2024.appspot.com",
  messagingSenderId: "965822319899",
  appId: "1:965822319899:web:0734635852472af64a57be",
  measurementId: "G-BG7CGNRFSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// async function getFighters(db){
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }