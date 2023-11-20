<script lang="ts">
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
  import socket from "../lib/sockets";
  import { auth } from "../lib/firebase";

  socket.connect();
  socket.on("connect_error", (error) => {
    console.log(error.message);
  });
</script>

<button
  on:click={() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        return result.user.getIdToken().then((idToken) => {
          fetch(`${import.meta.env.VITE_API_URL}/auth/sessionLogin`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: idToken }),
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }}>Log in with Google</button
>

<button
  on:click={() => {
    signOut(auth).then(() => {
      fetch(`${import.meta.env.VITE_API_URL}/auth/sessionLogout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    });
  }}>Log out</button
>
