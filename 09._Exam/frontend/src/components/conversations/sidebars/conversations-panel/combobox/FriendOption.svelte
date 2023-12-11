<script lang="ts">
  import { Check } from "lucide-svelte";
  import authStore from "../../../../../stores/authStore";
  import type { FriendFull } from "../../../../../utils/types";
  import { extractFriendKey } from "../../../../../utils/utils";

  export let friendship: FriendFull;
  export let handleSelectFriend: (friendId: string) => void;
  export let selectedForConversation: string[];

  const friend =
    friendship[extractFriendKey(friendship.senderId, $authStore.userId ?? "")];
</script>

<button
  on:click={() => handleSelectFriend(friend.id)}
  class="px-3 py-3 cursor-pointer hover:bg-activeChats text-left flex flex-row items-center text-sm"
>
  {#if selectedForConversation.includes(friend.id)}
    <span class="pr-2">
      <Check size={10} />
    </span>
  {/if}
  {friend.email}
</button>
