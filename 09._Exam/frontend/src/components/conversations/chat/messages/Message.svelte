<script lang="ts">
  import type { Message } from "../../../../utils/types";
  import MessageAvatar from "./MessageAvatar.svelte";
  import MessageBody from "./MessageBody.svelte";
  import MessageContent from "./MessageContent.svelte";
  import MessageHeader from "./MessageHeader.svelte";

  export let message: Message;
</script>

<div class="flex flex-row w-full space-x-4">
  <MessageAvatar />
  <MessageBody>
    <MessageHeader
      publishedAt={message.content.publishedAt}
      publisherUsername={message.content.publisherUsername}
    />
    <MessageContent content={message.content.message} />
  </MessageBody>
</div>
