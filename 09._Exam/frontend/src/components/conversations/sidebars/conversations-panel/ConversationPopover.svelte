<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from "@rgossiaux/svelte-headlessui";
  import { PenSquare, Check } from "lucide-svelte";
  import { extractFriendKey } from "../../../../utils/utils";
  import friendsStore from "../../../../stores/friendsStore";
  import Button from "../../../general/Button.svelte";
  import authStore from "../../../../stores/authStore";
  import toast from "svelte-french-toast";
  import conversationService from "../../../../services/conversationService";

  const handleSelectFriend = (friendId: string) => {
    if (selectedForConversation.includes(friendId)) {
      selectedForConversation = selectedForConversation.filter(
        (id) => id !== friendId,
      );
    } else {
      selectedForConversation = [...selectedForConversation, friendId];
    }
  };

  const handleCreateConversation = (callback: () => void) => {
    toast
      .promise(
        conversationService.createConversation(selectedForConversation),
        {
          loading: "Creating conversation...",
          success: (success) => success,
          error: (error) => error,
        },
      )
      .finally(() => {
        selectedForConversation = [];
        callback();
      });
  };

  let selectedForConversation: string[] = [];
</script>

<Popover class="relative">
  <PopoverButton>
    <PenSquare size={19} color={"white"} class="cursor-pointer" />
  </PopoverButton>
  <PopoverPanel
    let:close
    class="absolute z-10 w-[200px] h-auto max-h-[200px] bg-primary border-2 rounded-md border-border right-0 flex flex-col"
  >
    <div class="w-full border-b border-border">
      <input
        placeholder="Search friends..."
        class="w-full bg-primary rounded-tl-md rounded-tr-md border-b-2 border-border px-3 py-2 text-sm focus:outline-none text-white"
      />
    </div>
    <div class="flex flex-col text-message-username overflow-y-auto">
      {#each $friendsStore.friends as friend}
        <button
          on:click={() =>
            handleSelectFriend(
              friend[extractFriendKey(friend.senderId, $authStore.userId ?? "")]
                .id,
            )}
          class="px-3 py-3 cursor-pointer hover:bg-activeChats text-left flex flex-row items-center text-sm"
        >
          {#if selectedForConversation.includes(friend[extractFriendKey(friend.senderId, $authStore.userId ?? "")].id)}
            <span class="pr-2">
              <Check size={10} />
            </span>
          {/if}
          {friend[extractFriendKey(friend.senderId, $authStore.userId ?? "")]
            .email}
        </button>
      {/each}
    </div>
    <Button
      disabled={selectedForConversation.length === 0}
      class={`rounded-br-md rounded-bl-md rounded-t-none text-sm ${
        selectedForConversation.length === 0 ? "cursor-not-allowed" : null
      }`}
      on:click={() => handleCreateConversation(() => close(null))}
    >
      Create conversation
    </Button>
  </PopoverPanel>
</Popover>
