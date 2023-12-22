<script lang="ts">
  import { socket } from "../../../../lib/sockets/sockets";
  import messageService from "../../../../services/messageService";
  import conversationsStore from "../../../../stores/conversationsStore";
  import type { KeyEventInput } from "../../../../utils/types";

  const handleKeydown = (e: KeyEventInput) => {
    if (e.code !== "Enter" || !message) return;
    messageService.sendMessage(message);
    message = "";
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

<div class="justify-end">
  <div class="flex flex-col space-y-2">
    {#if selectedActive()}
      <p class="text-xs text-message-content">Someone is typing...</p>
    {/if}
    <input
      bind:value={message}
      on:keydown={handleKeydown}
      on:keyup={handleTyping}
      class="w-full h-[53px] bg-message-inputField flex-none rounded-lg text-message-inputText px-6 focus:outline-none placeholder:text-primary-foreground"
      placeholder="Send message"
    />
  </div>
</div>
