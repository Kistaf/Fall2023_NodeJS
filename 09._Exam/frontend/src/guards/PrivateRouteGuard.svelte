<script lang="ts">
  import { useLocation, useFocus, navigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import user from "../stores/authState";
  import api from "../utils/api";
  import NavSidebar from "../components/general/Sidebar.svelte";

  let isChecking = true;
  const location = useLocation();
  const registerFocus = useFocus();

  // TODO: Move logic out of component

  const navigateToLogin = () => {
    navigate("/", {
      state: {
        from: $location.pathname,
      },
      replace: true,
    });
  };

  onMount(async () => {
    try {
      const response = await api.auth.fetchCheckSession();
      if (!response.ok) {
        throw new Error("UnAuthorized");
      }
      const data = await response.json();
      user.setUser({
        loggedIn: true,
        userId: data.userId,
      });
    } catch {
      navigateToLogin();
    } finally {
      isChecking = false;
    }
  });

  $: if (!isChecking && !$user.loggedIn) {
    navigateToLogin();
  }
</script>

{#if !isChecking && $user.loggedIn}
  <div class="dark bg-background w-screen h-screen flex flex-row">
    <NavSidebar />
    <div class="flex-1">
      <slot {registerFocus} />
    </div>
  </div>
{/if}

{#if isChecking}
  <p>Authorizing...</p>
{/if}
