<script lang="ts">
  import authStore from "../../../../stores/authStore";
  import conversationsStore from "../../../../stores/conversationsStore";
  import type {
    Conversation,
    KeyEventDiv,
    Message,
  } from "../../../../utils/types";
  import { extractOtherPartKey } from "../../../../utils/utils";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  $: latestMessage = (): Message | undefined => {
    if (conversation.messages.length === 0) return undefined;
    return conversation.messages[conversation.messages.length - 1];
  };

  $: formattedTime = () => dayjs(latestMessage()?.createdAt).fromNow();

  const handleSetSelectedConversation = () => {
    if ($conversationsStore.selectedConversation?.id === conversation.id) {
      conversationsStore.setSelectedConversation(null);
      return;
    }
    conversationsStore.setSelectedConversation(conversation);
  };

  $: isSelected = () => {
    if (!$conversationsStore.selectedConversation) return false;
    if ($conversationsStore.selectedConversation.id === conversation.id)
      return true;
  };

  export let conversation: Conversation;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<button
  class={`w-full text-left flex flex-row justify-between hover:bg-message-inputField hover:rounded-md items-center px-2 py-1 cursor-pointer ${
    isSelected() ? "bg-message-inputField rounded-md" : ""
  }`}
  on:click={handleSetSelectedConversation}
>
  <div class="flex flex-row items-center space-x-2">
    <div class="w-10 h-10 bg-primary rounded-full flex-none" />
    <div class="flex flex-col text-sm">
      <h3 class="text-message-username line-clamp-1">
        {conversation[
          extractOtherPartKey(
            conversation.participantAId,
            $authStore.userId ?? "",
          )
        ].email}
      </h3>
      <p class="text-message-content line-clamp-1">
        {latestMessage()?.content ?? "No message"}
      </p>
    </div>
  </div>
  <p class="text-xs text-message-date flex-none">
    {formattedTime()}
  </p>
</button>
