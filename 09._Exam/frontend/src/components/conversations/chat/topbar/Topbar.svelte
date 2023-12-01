<script lang="ts">
  import conversationsStore from "../../../../stores/conversationsStore";
  import authState from "../../../../stores/authState";

  $: otherPart = () => {
    if (!$conversationsStore.selectedConversation) return undefined;
    const key =
      $conversationsStore.selectedConversation?.participantAId ===
      $authState.userId
        ? "participantB"
        : "participantA";
    return $conversationsStore.selectedConversation[key];
  };
</script>

<div class="space-y-4">
  <h3 class="text-message-username font-semibold text-lg">
    {otherPart()?.email ?? "No conversation selected"}
  </h3>
  <div class="justify-end h-[1px] rounded-full w-full bg-border"></div>
</div>
