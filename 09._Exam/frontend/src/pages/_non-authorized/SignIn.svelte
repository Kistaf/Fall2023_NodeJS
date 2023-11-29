<script lang="ts">
  import toast from "svelte-french-toast";
  import authService from "../../services/authService";

  const handleSignIn = () => {
    toast.promise(authService.loginWithCredentials({ email, password }), {
      loading: "Signing in...",
      success: (success) => success,
      error: (error) => error,
    });
  };

  let email: string;
  let password: string;
</script>

<input bind:value={email} type="email" placeholder="email" />
<input bind:value={password} type="password" placeholder="password" />

<button on:click={handleSignIn}>SignIn</button>
