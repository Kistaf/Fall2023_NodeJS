<script lang="ts">
  import ConversationsList from "./sidebars/conversations-list/ConversationsList.svelte";
  import Chat from "./chat/Chat.svelte";
</script>

<div class="flex flex-row">
  <ConversationsList />
  <Chat />
  <!-- <ConversationOverview /> -->
</div>
