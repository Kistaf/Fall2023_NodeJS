<script>
  import authService from "../../services/authService";
</script>

<div>Private conversations</div>

<button on:click={authService.logout}>Log out</button>
