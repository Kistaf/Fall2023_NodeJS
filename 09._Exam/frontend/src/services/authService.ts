import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import type { AuthService, Credentials } from "../types/authService";
import { user } from "../stores/authState";
import { navigate } from "svelte-navigator";
import { fetchSessionLogin, fetchSessionLogout } from "../api/auth";

function createAuthService(): AuthService {
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        return result.user.getIdToken().then(async (idToken) => {
          const response = await fetchSessionLogin(idToken);
          if (response.ok) {
            return navigate("/conversations", { replace: true });
          }
        });
      })
      .catch((error) => {
        // display toast
        console.log(error);
      });
  };
  const loginWithCredentials = (data: Credentials) => {};
  const registerWithCredentials = (data: Credentials) => {};
  const logout = () => {
    signOut(auth)
      .then(async () => {
        const response = await fetchSessionLogout();
        if (response.ok) {
          user.set({
            loggedIn: false,
            userId: null,
          });
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        // display toast
        console.log(error);
      });
  };

  return {
    loginWithGoogle,
    loginWithCredentials,
    registerWithCredentials,
    logout,
  };
}

export default createAuthService();
