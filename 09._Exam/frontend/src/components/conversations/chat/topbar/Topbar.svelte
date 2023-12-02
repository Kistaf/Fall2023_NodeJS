<script lang="ts">
  import conversationsStore from "../../../../stores/conversationsStore";
  import authStore from "../../../../stores/authStore";

  $: otherPart = () => {
    if (!$conversationsStore.selectedConversation) return undefined;
    const key =
      $conversationsStore.selectedConversation?.participantAId ===
      $authStore.userId
        ? "participantB"
        : "participantA";
    return $conversationsStore.selectedConversation[key];
  };
</script>

<div class="mb-4">
  <h3 class="text-message-username font-semibold text-lg">
    {otherPart()?.email ?? "No conversation selected"}
  </h3>
</div>
