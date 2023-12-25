<script lang="ts">
  import type { KeyEventInput } from "../../../utils/types";
  import friendService from "../../../services/friendService";
  import toast from "svelte-french-toast";

  const handleKeyDown = (e: KeyEventInput) => {
    if (e.code !== "Enter") return;
    toast
      .promise(
        friendService.requestFriend(email),
        {
          loading: "Friend request is being processed...",
          success: (success) => success,
          error: (error) => error,
        },
        { duration: 5000 },
      )
      .finally(() => {
        email = "";
      });
  };

  let email: string;
</script>

<div class="mb-6">
  <div class="space-y-4 mb-6">
    <div>
      <h1 class="uppercase text-foreground font-medium">Add Friend</h1>
      <p class="text-sm text-secondary-foreground">
        Add a new friend with their email
      </p>
    </div>
    <input
      bind:value={email}
      on:keydown={handleKeyDown}
      class="w-full bg-input flex-none rounded-md text-foreground px-6 py-3 focus:outline-none border border-border"
      placeholder="emilie@gmail.com"
    />
  </div>
  <div class="w-full h-[1px] rounded-full bg-border" />
</div>
