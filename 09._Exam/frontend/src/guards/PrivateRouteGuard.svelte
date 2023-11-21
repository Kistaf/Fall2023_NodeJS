<script lang="ts">
  import { useNavigate, useLocation, useFocus } from "svelte-navigator";
  import { onMount } from "svelte";
  import { user } from "../stores/authState";
  import socket from "../lib/sockets";

  let isChecking = true;
  const navigate = useNavigate();
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/checkSession`,
        {
          method: "GET",
          credentials: "include",
        },
      );

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
