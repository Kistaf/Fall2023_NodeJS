<script lang="ts">
  import conversationsStore from "../../../stores/conversationsStore";
  import Messages from "./messages/Messages.svelte";
  import Messenger from "./messenger/Messenger.svelte";
  import Topbar from "./topbar/Topbar.svelte";
</script>

<div
  class="flex-1 h-screen w-full bg-primary border-l-[1px] border-r-[1px] border-border"
>
  <div class="w-full h-screen flex flex-col px-6 py-4">
    {#if !$conversationsStore.selectedConversation}
      <div
        class="w-full h-full flex justify-center items-center text-message-content font-semibold"
      >
        No conversation selected
      </div>
    {:else}
      <Topbar />
      <Messages />
      <Messenger />
    {/if}
  </div>
</div>
