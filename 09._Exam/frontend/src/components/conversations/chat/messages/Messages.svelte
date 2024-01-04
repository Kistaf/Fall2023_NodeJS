<script lang="ts">
  import { afterUpdate } from "svelte";
  import conversationsStore from "../../../../stores/conversationsStore";
  import Message from "./Message.svelte";

  let element: HTMLDivElement;

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

<div
  class="flex-1 overflow-y-scroll hide-native-scrollbar mb-2"
  bind:this={element}
>
  <div
    class={`w-full h-full flex flex-col-reverse ${
      ($conversationsStore.selectedConversation?.messages.length ?? 0) < 13
        ? "justify-start"
        : "justify-end"
    }`}
  >
    <div class="space-y-6">
      {#each $conversationsStore?.selectedConversation?.messages ?? [] as message}
        <Message {message} />
      {/each}
    </div>
  </div>
</div>
