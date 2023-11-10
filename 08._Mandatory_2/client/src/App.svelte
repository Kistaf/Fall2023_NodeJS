<script lang="ts">
  import { Router } from "svelte-navigator";
  import Login from "./pages/Login/Login.svelte";
  import Signup from "./pages/Signup/Signup.svelte";
  import PrivateRoute from "./auth/routes/PrivateRoute.svelte";
  import AuthRoute from "./auth/routes/AuthRoute.svelte";
  import Private from "./pages/Private/Private.svelte";
</script>

<Router>
  <AuthRoute path="/">
    <Login />
  </AuthRoute>
  <AuthRoute path="/login">
    <Login />
  </AuthRoute>
  <AuthRoute path="/signup">
    <Signup />
  </AuthRoute>
  <PrivateRoute path="/private">
    <Private />
  </PrivateRoute>
</Router>
