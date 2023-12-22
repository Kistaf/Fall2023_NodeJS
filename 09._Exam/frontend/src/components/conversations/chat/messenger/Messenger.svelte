<script lang="ts">
  // import { socket } from "../../../../lib/sockets/sockets";
  import messageService from "../../../../services/messageService";
  // import conversationsStore from "../../../../stores/conversationsStore";
  // import authStore from "../../../../stores/authStore";
  import type { KeyEventInput } from "../../../../utils/types";

  const handleKeydown = (e: KeyEventInput) => {
    if (e.code !== "Enter" || !message) return;
    messageService.sendMessage(message);
    message = "";
  };

  // const timeoutFunc = () => {
  //   isTyping = false;
  //   socket.emit("stoppedTyping", {
  //     userId: $authStore.userId,
  //     convId: $conversationsStore.selectedConversation?.id,
  //   });
  // };

  // const handleTyping = () => {
  //   if (isTyping === false) {
  //     isTyping = true;
  //     socket.emit("isTyping", {
  //       userId: $authStore.userId,
  //       convId: $conversationsStore.selectedConversation?.id,
  //     });
  //     timeout = setTimeout(timeoutFunc, 5000);
  //   } else {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(timeoutFunc, 5000);
  //   }
  // };

  // let isTyping = false;
  // let timeout: number;
  let message: string = "";
</script>

<div class="justify-end">
  <input
    bind:value={message}
    on:keydown={handleKeydown}
    class="w-full h-[53px] bg-message-inputField flex-none rounded-lg text-message-inputText px-6 focus:outline-none placeholder:text-primary-foreground"
    placeholder="Send message"
  />
</div>
