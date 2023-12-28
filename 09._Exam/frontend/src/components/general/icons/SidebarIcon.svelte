<script lang="ts">
  import type { PageState } from "../../../utils/types";
  import pageState from "../../../stores/sectionStore";
  import { Link } from "svelte-navigator";
  import conversationsStore from "../../../stores/conversationsStore";

  export let notifications: number | undefined = undefined;
  export let section: PageState;
</script>

<Link
  to={section === "/conversations" && $conversationsStore.selectedConversation
    ? `/conversations/${$conversationsStore.selectedConversation.id}`
    : section}
  class={`flex justify-center hover:bg-background relative py-5 ${
    $pageState.includes(section) ? "bg-background" : ""
  }`}
  on:click={() => pageState.setPage(section)}
>
  <slot />
  {#if notifications}
    <div
      class="absolute w-4 h-4 rounded-full bg-red-600/90 left-10 top-3 flex justify-center items-center"
    >
      <div class="text-xs px-2 font-bold text-white">
        {notifications}
      </div>
    </div>
  {/if}
</Link>
