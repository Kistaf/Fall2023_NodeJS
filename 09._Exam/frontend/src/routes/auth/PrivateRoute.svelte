<script lang="ts">
  import { Route } from "svelte-navigator";
  import PrivateRouteGuard from "../../guards/PrivateRouteGuard.svelte";
  import type { ComponentType } from "svelte";

  export let path: string;
  export let loading: ComponentType;
</script>

<Route {path} let:params let:location let:navigate>
  <PrivateRouteGuard {loading}>
    <slot {params} {location} {navigate} />
  </PrivateRouteGuard>
</Route>
