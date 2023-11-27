<script lang="ts">
  import type { KeyEvent } from "../../../../utils/types";

  const handleKeyDown = (e: KeyEvent) => {
    if (e.code === "Enter") {
      console.log("Shift is pressed:", shiftPressed);
    } else if (e.code === "ShiftLeft") shiftPressed = true;
  };

  const handleKeyUp = (e: KeyEvent) =>
    e.code === "ShiftLeft" && (shiftPressed = false);

  let shiftPressed: boolean = false;
  let message: string = "";
</script>

<div class="justify-end">
  <input
    bind:value={message}
    on:keydown={handleKeyDown}
    on:keyup={handleKeyUp}
    class="w-full h-[53px] bg-message-inputField flex-none rounded-lg text-message-inputText px-6 focus:outline-none placeholder:text-primary-foreground"
    placeholder="Message Emilie"
  />
</div>
