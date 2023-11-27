<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import type { PageState } from "../../utils/types";
  import sectionState from "../../stores/sectionState";
  import Conversations from "../../components/conversations/Conversations.svelte";
  import Friends from "../../components/friends/Friends.svelte";
  import Settings from "../../components/settings/Settings.svelte";
  import NotFound from "../../components/notFound/NotFound.svelte";

  const location = useLocation();

  $: {
    const searchParams = new URLSearchParams($location.search);
    const pathname = $location.pathname.split("/")[1];
    if (searchParams.has("section") && pathname === "chatting") {
      const pageSection = searchParams.get("section") as PageState;
      sectionState.setSection(pageSection);
    }
  }
</script>

{#if $sectionState === "conversations"}
  <Conversations />
{:else if $sectionState === "friends"}
  <Friends />
{:else if $sectionState === "settings"}
  <Settings />
{:else}
  <NotFound />
{/if}
