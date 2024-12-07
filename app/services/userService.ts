import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface UserProofs {
  // Add specific proof types based on your Reclaim response
  twitterHandle?: string;
  followersCount?: number;
  // ... other proof fields
}

export default async function createUserWithProofs(proofs: UserProofs) {
  try {
    const userId = `twitter_${proofs.twitterHandle}`; // or generate a unique ID
    const userData = {
      twitterHandle: proofs.twitterHandle,
      followersCount: proofs.followersCount,
      verifiedAt: new Date().toISOString(),
      proofs: proofs, // Store the full proof object
    };

    await setDoc(doc(db, "users", userId), userData);
    return userData;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
