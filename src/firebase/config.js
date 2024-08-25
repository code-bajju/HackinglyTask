// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDY4cMXUngi4Zdv-n8NUyp9fHK6HpeJ-CE",
	authDomain: "hackingly-f2618.firebaseapp.com",
	projectId: "hackingly-f2618",
	storageBucket: "hackingly-f2618.appspot.com",
	messagingSenderId: "12686634495",
	appId: "1:12686634495:web:e92e42dd07997294b50bca",
	measurementId: "G-WWJ4GCQBGL"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
