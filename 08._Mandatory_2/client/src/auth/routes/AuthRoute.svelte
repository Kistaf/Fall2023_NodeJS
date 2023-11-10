<script lang="ts">
  import { Route } from "svelte-navigator";
  import AuthLayout from "./AuthLayout.svelte";

  export let path: string;
</script>

<Route {path} let:params let:location let:navigate>
  <AuthLayout>
    <slot {params} {location} {navigate} />
  </AuthLayout>
</Route>
