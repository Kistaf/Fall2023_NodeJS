<script lang="ts">
  import type { KeyEvent } from "../../../utils/types";

  const handleKeyDown = (e: KeyEvent) => {
    if (e.code === "Enter") {
      console.log("Send friend request");
    }
  };
</script>

<div class="mb-6">
  <div class="space-y-4 mb-6">
    <div>
      <h1 class="uppercase text-message-username font-medium">Add Friend</h1>
      <p class="text-sm text-message-content">
        Add a new friend with their email
      </p>
    </div>
    <input
      on:keydown={handleKeyDown}
      class="w-full bg-message-inputField flex-none rounded-md text-message-inputText px-6 py-2 focus:outline-none placeholder:text-primary-foreground"
      placeholder="emilie@gmail.com"
    />
  </div>
  <div class="w-full h-[1px] rounded-full bg-border" />
</div>
