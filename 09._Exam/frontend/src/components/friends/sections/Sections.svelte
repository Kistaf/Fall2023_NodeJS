<script lang="ts">
  import { MoreVertical } from "lucide-svelte";
  import friendService from "../../../services/friendService";
  import authStore from "../../../stores/authStore";
  import friendsStore from "../../../stores/friendsStore";
  import Button from "../../general/Button.svelte";
  import FriendCard from "../cards/FriendCard.svelte";
  import Section from "./Section.svelte";
  import toast from "svelte-french-toast";

  const filterSenderReceiver = (senderId: string) =>
    senderId === $authStore.userId ? "receiver" : "sender";

  const handleDeleteFriendRequest = (frqId: string) => {
    toast.promise(friendService.deleteFriendRequest(frqId), {
      loading: "Deleting friend...",
      success: (success) => success,
      error: (error) => error,
    });
  };

  const handleAcceptFriendRequest = (frqId: string) => {
    toast.promise(friendService.acceptFriendRequest(frqId), {
      loading: "Accepting friend...",
      success: (success) => success,
      error: (error) => error,
    });
  };
</script>

<div class="space-y-8">
  {#if $friendsStore.received.length > 0}
    <Section sectionName="Received friend requests">
      {#each $friendsStore.received as friend}
        <FriendCard email={friend.sender.email} createdDate={friend.createdAt}>
          <Button on:click={() => handleAcceptFriendRequest(friend.id)}>
            Accept
          </Button>
          <Button
            intent={"action"}
            on:click={() => handleDeleteFriendRequest(friend.id)}
          >
            Deny
          </Button>
        </FriendCard>
      {/each}
    </Section>
  {/if}

  {#if $friendsStore.sent.length > 0}
    <Section sectionName="Sent friend requests">
      {#each $friendsStore.sent as friend}
        <FriendCard
          email={friend.receiver.email}
          createdDate={friend.createdAt}
        >
          <Button
            intent={"action"}
            on:click={() => handleDeleteFriendRequest(friend.id)}
          >
            Cancel
          </Button>
        </FriendCard>
      {/each}
    </Section>
  {/if}

  {#if $friendsStore.friends.length > 0}
    <Section sectionName="Friends">
      {#each $friendsStore.friends as friend}
        <FriendCard
          email={friend[filterSenderReceiver(friend.senderId)].email}
          createdDate={friend.createdAt}
        >
          <MoreVertical
            class="text-button-primary hover:text-button-primary-hover cursor-not-allowed"
          />
        </FriendCard>
      {/each}
    </Section>
  {/if}
</div>
