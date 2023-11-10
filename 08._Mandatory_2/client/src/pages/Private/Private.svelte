<script lang="ts">
  import { authService } from "../../stores/auth";
  import Button from "../../components/ui/Button.svelte";
  import { fetchSecretMessage } from "../../api/api";

  let secretMessage = "";

  const loadSecretMessage = async () => {
    const res = await fetchSecretMessage();

    if (res.sucess) {
      secretMessage = res.secret;
    } else {
      throw new Error("Could not fetch secret message");
    }
  };
</script>

<div class="m-4">
  <h1 class="text-6xl text-red-500">Private page</h1>
  <h4>Hello {$authService.user?.email ?? "Unable to fetch email"}</h4>

  <Button on:click={authService.logout} isLoading={$authService.isLoading}>
    Logout
  </Button>

  <Button on:click={loadSecretMessage}>Load secret message</Button>

  {#if secretMessage}
    <p>Your secret message is: {secretMessage}</p>
  {/if}
</div>
