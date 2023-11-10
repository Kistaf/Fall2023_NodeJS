<script lang="ts">
  import Button from "../../components/ui/Button.svelte";
  import Input from "../../components/ui/Input.svelte";
  import { authService } from "../../stores/auth";
  import { warningToast } from "../../components/ui/Toast";

  let email: string = "";
  let password: string = "";

  const handleLogin = () => {
    if (!email || !password) {
      warningToast("Please fill in all the input fields");
      return;
    }
    authService.signIn({
      email: email,
      password: password,
    });
  };
</script>

<h1 class="text-4xl font-extrabold">Login</h1>
<div class="container md:max-w-3xl 2xl:max-w-6xl space-y-8">
  <div class="space-y-3 flex flex-col">
    <div class="space-y-2">
      <Input bind:value={email} placeholder="Email" type="email" />
      <Input bind:value={password} placeholder="Password" type="password" />
    </div>
    <div class="flex justify-end">
      <a href="/signup" class="text-sm font-medium">Not already a user?</a>
    </div>
  </div>
  <Button isLoading={$authService.isLoading} on:click={handleLogin} size="full">
    Login
  </Button>
</div>
