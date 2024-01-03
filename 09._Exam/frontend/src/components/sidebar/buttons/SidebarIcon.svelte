<script lang="ts">
  import type { PageState } from "../../../utils/types";
  import pageState from "../../../stores/sectionStore";
  import { Link, navigate } from "svelte-navigator";
  import conversationsStore from "../../../stores/conversationsStore";
  import { cn } from "../../../utils/utils";

  export let notifications: number | undefined = undefined;
  export let section: PageState;

  const isSelected = $pageState.includes(section) ? "bg-background" : undefined;

  const navigateTo =
    section === "/conversations" && $conversationsStore.selectedConversation
      ? `/conversations/${$conversationsStore.selectedConversation.id}`
      : section;
</script>

<Link
  to={navigateTo}
  class={cn(
    "flex justify-center hover:bg-background relative py-5",
    isSelected,
  )}
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
