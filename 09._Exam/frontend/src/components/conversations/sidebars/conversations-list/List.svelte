<script lang="ts">
  import conversationsStore from "../../../../stores/conversationsStore";
  import Conversation from "./Conversation.svelte";
</script>

<div class="flex flex-col space-y-4">
  {#each $conversationsStore.conversations as conversation}
    <Conversation {conversation} />
  {/each}
</div>
