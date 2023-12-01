<script lang="ts">
  import messageService from "../../../../services/messageService";
  import type { KeyEventInput } from "../../../../utils/types";

  const handleKeydown = (e: KeyEventInput) => {
    if (e.code !== "Enter" || !message) return;
    messageService.sendMessage(message);
    message = "";
  };

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
