<script lang="ts">
  import conversationsStore from "../../../../stores/conversationsStore";
  import authStore from "../../../../stores/authStore";
  import InPlaceEdit from "../../../general/InPlaceEdit.svelte";
  import toast from "svelte-french-toast";
  import conversationService from "../../../../services/conversationService";

  const handleSubmit = (e: CustomEvent<any>) => {
    toast.promise(
      conversationService.updateConversationTitle(
        $conversationsStore.selectedConversation?.id ?? "",
        e.detail,
      ),
      {
        loading: "Updating title...",
        success: (success) => success,
        error: (error) => error,
      },
    );
  };
</script>

<div class="mb-4 border-b border-border pb-2 h-[40px]">
  <h3 class="text-primary font-semibold text-lg">
    {#if $conversationsStore.selectedConversation?.creator.id === $authStore.userId}
      <InPlaceEdit
        bind:text={$conversationsStore.selectedConversation.convName}
        on:submit={handleSubmit}
      />
    {:else if $conversationsStore.selectedConversation?.convName}
      {$conversationsStore.selectedConversation?.convName}
    {:else}
      No conversation title
    {/if}
  </h3>
</div>
