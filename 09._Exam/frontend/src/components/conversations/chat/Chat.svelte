<script lang="ts">
  import Messages from "./messages/Messages.svelte";
  import Messenger from "./messenger/Messenger.svelte";
  import Topbar from "./topbar/Topbar.svelte";

  const chatSelected: boolean = true;
</script>

<div
  class="flex-1 h-screen w-full bg-primary border-l-[1px] border-r-[1px] border-border"
>
  {#if chatSelected}
    <div class="w-full h-screen flex flex-col px-6 py-4">
      <Topbar />
      <Messages />
      <Messenger />
    </div>
  {:else}
    <div
      class="w-full h-screen flex justify-center items-center text-lg text-primary-foreground"
    >
      No chat selected
    </div>
  {/if}
</div>
