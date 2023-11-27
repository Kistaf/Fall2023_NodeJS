<script lang="ts">
  import ConversationsList from "./sidebars/ConversationsList.svelte";
  import ConversationOverview from "./sidebars/ConversationOverview.svelte";
  import Chat from "./chat/Chat.svelte";
</script>

<div class="flex flex-row">
  <ConversationsList />
  <Chat />
  <ConversationOverview />
</div>
