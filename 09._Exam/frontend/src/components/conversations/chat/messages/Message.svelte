<script lang="ts">
  import type { Message } from "../../../../utils/types";
  import Avatar from "../../../ui/Avatar.svelte";
  import MessageBody from "./MessageBody.svelte";
  import MessageContent from "./MessageContent.svelte";
  import MessageHeader from "./MessageHeader.svelte";
  import MessageOptions from "./MessageOptions.svelte";

  const handleMouseEnter = () => (open = true);
  const handleMouseLeave = () => (open = false);

  let open = false;
  export let message: Message;
</script>

<div
  role="menu"
  tabindex="0"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="flex flex-row w-full space-x-4 hover:bg-secondary hover:rounded-md relative"
>
  <Avatar url={message.author.avatarURL} />
  <MessageBody>
    <MessageHeader
      publishedAt={message.createdAt}
      publisherUsername={message.author.email}
    />
    <MessageContent content={message.content} />
  </MessageBody>
  {#if open}
    <MessageOptions {message} />
  {/if}
</div>
