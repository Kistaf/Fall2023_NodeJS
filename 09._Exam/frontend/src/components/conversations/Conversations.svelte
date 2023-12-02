<script lang="ts">
  import ConversationsPanel from "./sidebars/conversations-panel/ConversationsPanel.svelte";
  import Chat from "./chat/Chat.svelte";
</script>

<div class="flex flex-row">
  <ConversationsPanel />
  <Chat />
  <!-- <ConversationOverview /> -->
</div>
