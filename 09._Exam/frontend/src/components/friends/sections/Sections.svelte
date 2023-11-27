<script lang="ts">
  import Section from "./Section.svelte";

  const outgoingFriendRequests = [];
  const incomingFriendRequests = [];
  const friends = ["1"];
</script>

<div class="space-y-8">
  {#if outgoingFriendRequests.length > 0}
    <Section sectionName="Outgoing friend requests">
      <div class="text-white">Test</div>
    </Section>
  {/if}

  {#if incomingFriendRequests.length > 0}
    <Section sectionName="Incoming friend requests"></Section>
  {/if}

  {#if friends.length > 0}
    <Section sectionName="Friends"></Section>
  {/if}
</div>
