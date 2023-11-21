<script lang="ts">
  import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
  import { Route, Router } from "svelte-navigator";
  import SignIn from "./pages/SignIn.svelte";
  import SignUp from "./pages/SignUp.svelte";
  import PrivateRoute from "./routes/auth/PrivateRoute.svelte";
  import Conversations from "./pages/authenticated/Conversations.svelte";

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
    <Route component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <PrivateRoute path="/conversations">
      <Conversations />
    </PrivateRoute>
  </Router>
</QueryClientProvider>
