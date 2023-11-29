<script lang="ts">
  import friendsStore from "../../../stores/friendsStore";
  import Section from "./Section.svelte";
</script>

<div class="space-y-8">
  {#if $friendsStore.received.length > 0}
    <Section sectionName="Received friend requests">
      {#each $friendsStore.received as friend}
        <div class="text-white">{friend.id}</div>
      {/each}
    </Section>
  {/if}

  {#if $friendsStore.sent.length > 0}
    <Section sectionName="Sent friend requests">
      {#each $friendsStore.sent as friend}
        <div class="text-white">{friend.id}</div>
      {/each}
    </Section>
  {/if}

  {#if $friendsStore.friends.length > 0}
    <Section sectionName="Friends">
      {#each $friendsStore.friends as friend}
        <div class="text-white">{friend.id}</div>
      {/each}
    </Section>
  {/if}
</div>
