import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//เอามาจาก firebase ใช้ connect database
const firebaseConfig = {
  apiKey: "AIzaSyAgkCJSHGTrA4WrDOEwAj89lvzqtI6JG-o",
  authDomain: "flutterrmutl-37dda.firebaseapp.com",
  projectId: "flutterrmutl-37dda",
  storageBucket: "flutterrmutl-37dda.appspot.com",
  messagingSenderId: "840066852686",
  appId: "1:840066852686:web:4088631be0988859fda01f"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig, "myAppName");

// Get Firestore instance
const db = getFirestore(app);

// Export the Firestore instance for use in other parts of your code
export { db };
