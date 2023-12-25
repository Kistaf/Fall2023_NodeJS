<script lang="ts">
  import { socket } from "../../../../lib/sockets/sockets";
  import messageService from "../../../../services/messageService";
  import conversationsStore from "../../../../stores/conversationsStore";
  import type { KeyEventInput } from "../../../../utils/types";

  const handleKeyUp = (e: KeyEventInput) => {
    if (e.code !== "Enter" || !message) return;
    messageService.sendMessage(message);
    message = "";
    isTyping = false;
    socket.emit("stoppedTyping", {
      convId: $conversationsStore.selectedConversation?.id,
    });
  };

  const timeoutFunc = () => {
    isTyping = false;
    socket.emit("stoppedTyping", {
      convId: $conversationsStore.selectedConversation?.id,
    });
  };

  const handleTyping = () => {
    if (isTyping === false) {
      isTyping = true;
      socket.emit("isTyping", {
        convId: $conversationsStore.selectedConversation?.id,
      });
      timeout = setTimeout(timeoutFunc, 3000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunc, 3000);
    }
  };

  $: selectedActive = () =>
    convsActive.includes($conversationsStore.selectedConversation?.id ?? "");

  socket.on("typing:ongoing", (payload: { convId: string }) => {
    if (convsActive.includes(payload.convId)) return;
    convsActive = [...convsActive, payload.convId];
  });

  socket.on("typing:stopped", (payload: { convId: string }) => {
    convsActive = convsActive.filter((conv) => conv !== payload.convId);
  });

  let isTyping = false;
  let timeout: number;
  let message: string = "";
  let convsActive: string[] = [];
</script>

<div class="h-[70px]">
  <div class="h-full flex justify-end flex-col space-y-2">
    {#if selectedActive()}
      <p class="text-xs flex-1 text-secondary-foreground">
        Someone is typing...
      </p>
    {/if}
    <input
      bind:value={message}
      on:keyup={handleKeyUp}
      on:keydown={handleTyping}
      class="w-full h-[53px] bg-input border text-foreground border-border flex-none rounded-lg px-6 focus:outline-none"
      placeholder="Send message"
    />
  </div>
</div>
