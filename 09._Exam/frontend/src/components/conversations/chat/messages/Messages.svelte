<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import conversationsStore from "../../../../stores/conversationsStore";
  import Message from "./Message.svelte";

  let element: HTMLDivElement;

  // $: sortedMessages = () =>
  //   $conversationsStore.selectedConversation?.messages.sort((a, b) => {
  //     if (a.createdAt < b.createdAt) {
  //       return -1;
  //     } else if (a.createdAt > b.createdAt) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  const scrollToBottom = (node: HTMLDivElement) => {
    const scroll = () => {
      node.scroll({
        top: node.scrollHeight,
        behavior: "instant",
      });
    };
    scroll();

    return { update: scroll };
  };

  afterUpdate(() => {
    scrollToBottom(element);
  });
</script>

<div class="flex-1 overflow-y-auto hide-native-scrollbar" bind:this={element}>
  <div class="w-full h-full flex flex-col-reverse justify-end">
    <div class="space-y-4">
      {#each $conversationsStore?.selectedConversation?.messages ?? [] as message}
        <Message {message} />
      {/each}
    </div>
  </div>
</div>
