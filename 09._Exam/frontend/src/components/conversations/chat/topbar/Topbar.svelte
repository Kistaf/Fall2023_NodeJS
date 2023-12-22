<script lang="ts">
  import conversationsStore from "../../../../stores/conversationsStore";
  import authStore from "../../../../stores/authStore";
  import { conversationTitle } from "../../../../utils/utils";
</script>

<div class="mb-4">
  <h3 class="text-message-username font-semibold text-lg">
    {conversationTitle(
      $conversationsStore.selectedConversation?.usersToConversation ?? [],
      $authStore.userId ?? "",
    )}
  </h3>
</div>
