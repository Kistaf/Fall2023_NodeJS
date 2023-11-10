<script lang="ts">
  import { useNavigate, useLocation, useFocus } from "svelte-navigator";
  import { authService } from "../../stores/auth";
  import { onMount } from "svelte";
  import { errorToast } from "../../components/ui/Toast";

  let isChecking = true;
  const navigate = useNavigate();
  const location = useLocation();
  const registerFocus = useFocus();

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
      await authService.checkAuth();
    } catch {
      errorToast("Unauthorized");
      navigateToLogin();
    } finally {
      isChecking = false;
    }
  });

  $: if (!$authService.user && !isChecking) {
    navigateToLogin();
  }
</script>

{#if $authService.user && !isChecking}
  <slot {registerFocus} />
{/if}

{#if isChecking}
  <p>Authorizing...</p>
{/if}
