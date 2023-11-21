<script lang="ts">
  import {
    useNavigate,
    useLocation,
    useFocus,
    navigate,
  } from "svelte-navigator";
  import { onMount } from "svelte";
  import { user } from "../stores/authState";
  import socket from "../lib/sockets";
  import { checkSession } from "../api/auth";

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
            userId: data.userId,
          });
        });
        socket.on("connect_error", (error) => {
          throw new Error("Failed to authorize to the socket server");
        });
        user.set({
          loggedIn: true,
          userId: data.userId,
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
  <slot {registerFocus} />
{/if}

{#if isChecking}
  <p>Authorizing...</p>
{/if}
