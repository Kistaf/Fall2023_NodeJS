<script lang="ts">
  import { useLocation, useFocus, navigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import { user } from "../stores/authState";
  import socket from "../lib/sockets";
  import { checkSession } from "../utils/api";
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
      const response = await checkSession();
      if (!response.ok) {
        throw new Error("UnAuthorized");
      } else {
        const data = await response.json();
        socket.connect();
        socket.on("connect", () => {
          socket.emit("user:add", {
            socketId: socket.id,
            userId: data.user.id,
          });
        });
        socket.on("connect_error", (error) => {
          throw new Error("Failed to authorize to the socket server");
        });
        user.set({
          loggedIn: true,
          user: {
            id: data.user.id,
            avatarURL: data.user.avatarURL,
          },
        });
      }
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
