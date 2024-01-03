<script lang="ts">
  import { Route, Router } from "svelte-navigator";
  import SignIn from "./pages/_non-authorized/SignIn.svelte";
  import SignUp from "./pages/_non-authorized/SignUp.svelte";
  import PrivateRoute from "./routes/auth/PrivateRoute.svelte";
  import { Toaster } from "svelte-french-toast";
  import Conversations from "./pages/_authorized/Conversations.svelte";
  import Conversation from "./pages/_authorized/Conversation.svelte";
  import Friends from "./pages/_authorized/Friends.svelte";
  import FriendsLoading from "./components/loading/FriendsLoading.svelte";
  import ConversationsLoading from "./components/loading/ConversationsLoading.svelte";
</script>

<Router>
  <Toaster />
  <Route component={SignIn} />
  <Route path="/signup" component={SignUp} />
  <PrivateRoute path="/conversations" loading={ConversationsLoading}>
    <Conversations />
  </PrivateRoute>
  <PrivateRoute
    path="/conversations/:id"
    loading={ConversationsLoading}
    let:params
  >
    <Conversation id={params.id} />
  </PrivateRoute>
  <PrivateRoute path="/friends" loading={FriendsLoading}>
    <Friends />
  </PrivateRoute>
</Router>
