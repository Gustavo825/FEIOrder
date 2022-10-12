import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCg5WkOMoiQHJJC4TIJvcujf0qSJiKz_o0",
  authDomain: "feiorder-7787d.firebaseapp.com",
  projectId: "feiorder-7787d",
  storageBucket: "feiorder-7787d.appspot.com",
  messagingSenderId: "286524020223",
  appId: "1:286524020223:web:491d7b5e73ab89918383ca",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
export { storage };
