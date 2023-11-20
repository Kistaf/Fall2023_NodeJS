import firebaseAdmin from "firebase-admin";

export const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    "./src/lib/firebase/service_account.json"
  ),
});
