<script lang="ts">
  import { Route, Router } from "svelte-navigator";
  import SignIn from "./pages/_non-authorized/SignIn.svelte";
  import SignUp from "./pages/_non-authorized/SignUp.svelte";
  import PrivateRoute from "./routes/auth/PrivateRoute.svelte";
  import Chatting from "./pages/_authorized/Chatting.svelte";
  import { Toaster } from "svelte-french-toast";
</script>

<Router>
  <Toaster />
  <Route component={SignIn} />
  <Route path="/signup" component={SignUp} />
  <PrivateRoute path="/chatting">
    <Chatting />
  </PrivateRoute>
</Router>
