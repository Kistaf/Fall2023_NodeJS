<script lang="ts">
  import authService from "../../services/authService";
</script>

<button on:click={authService.loginWithGoogle}>Google SignIn</button>
