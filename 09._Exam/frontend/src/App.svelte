<script lang="ts">
  import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
  import { Route, Router } from "svelte-navigator";
  import Test from "./pages/Test.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <Router>
    <Route path="/">
      <Test />
    </Route>
  </Router>
</QueryClientProvider>
