<script lang="ts">
  import dayjs from "dayjs";
  import type { FriendFull } from "../../../utils/types";
  import Avatar from "../../ui/Avatar.svelte";

  export let friend: FriendFull;
  export let email: string;

  const formattedCreateDate = () =>
    dayjs(friend.createdAt).format("MMMM, dddd D");
</script>

<div
  class="flex flex-row w-full h-[90px] justify-between items-center rounded-lg px-6 py-4 text-white bg-muted"
>
  <div class="flex flex-row space-x-4">
    <Avatar url={friend.sender.avatarURL} />
    <div class="flex flex-col justify-center">
      <h3 class="text-secondary-foreground">{email}</h3>
      <p class="text-sm text-muted-foreground">Since {formattedCreateDate()}</p>
    </div>
  </div>

  <!-- Actions -->
  <div class="flex flex-row space-x-2">
    <slot />
  </div>
</div>
