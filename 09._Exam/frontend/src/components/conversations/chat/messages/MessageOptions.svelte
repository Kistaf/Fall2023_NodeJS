<script lang="ts">
  import { MoreHorizontal, Trash, Clipboard } from "lucide-svelte";
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Dialog,
    DialogTitle,
  } from "@rgossiaux/svelte-headlessui";
  import toast from "svelte-french-toast";
  import Button from "../../../ui/Button.svelte";
  import messageService from "../../../../services/messageService";
  import type { Message } from "../../../../utils/types";
  import authStore from "../../../../stores/authStore";
  import conversationsStore from "../../../../stores/conversationsStore";
  import { cn } from "../../../../utils/utils";

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message.id);
    toast.success("Copied Message ID to Clipboard");
  };

  const handleDelete = () => {
    toast
      .promise(messageService.deleteMessage(message.id), {
        loading: "Deleting message...",
        success: (success) => success,
        error: (error) => error,
      })
      .finally(() => toggleDeleteDialog());
  };

  const isLastMessage = () => {
    const messages = $conversationsStore.selectedConversation?.messages;
    const lastMessage = messages?.at(messages.length - 1);
    if (message.id !== lastMessage?.id) return "top-4";

    if (
      $authStore.userId === message.authorId ||
      $conversationsStore.selectedConversation?.creator.id === $authStore.userId
    ) {
      return "-top-[5.2rem]";
    }

    return "-top-[2.9rem]";
  };

  const toggleDeleteDialog = () => (openDeleteDialog = !openDeleteDialog);

  let openDeleteDialog = false;
  export let message: Message;
</script>

<Menu>
  <MenuButton
    class="absolute -top-2 right-0 bg-popover px-1 text-popover-foreground border border-border rounded-md"
  >
    <MoreHorizontal size={17} />
  </MenuButton>
  <MenuItems
    class={cn(
      "z-10 p-1 absolute space-y-1 right-0 w-[120px] bg-popover border border-border rounded-md",
      isLastMessage(),
    )}
  >
    <MenuItem
      class="p-1 flex flex-row cursor-pointer space-x-2 items-center hover:bg-secondary hover:rounded-md"
      on:click={handleCopyToClipboard}
    >
      <Clipboard size={15} class="text-primary" />
      <p class="text-popover-foreground text-sm">Copy ID</p>
    </MenuItem>
    {#if message.authorId === $authStore.userId || $conversationsStore.selectedConversation?.creator.id === $authStore.userId}
      <div class="w-full rounded-full bg-secondary h-[1px]"></div>
      <MenuItem
        class="p-1 flex flex-row cursor-pointer space-x-2 items-center hover:bg-secondary hover:rounded-md"
        on:click={toggleDeleteDialog}
      >
        <Trash size={15} class="text-red-500" />
        <p class="text-popover-foreground text-sm">Delete</p>
      </MenuItem>
    {/if}
  </MenuItems>
</Menu>

<Dialog open={openDeleteDialog} on:close={() => (openDeleteDialog = false)}>
  <div class="z-10 inset-0 fixed">
    <div class="flex justify-center items-center min-h-screen">
      <div
        class="flex flex-col justify-between bg-popover border rounded-lg text-left border-border w-[300px] h-[140px] px-4 py-2"
      >
        <DialogTitle class="text-lg font-medium text-popover-foreground">
          Delete message
        </DialogTitle>
        <p class="text-popover-foreground/80 text-sm">
          Are you sure you want to delete this message?
        </p>

        <div class="flex flex-row space-x-2 justify-end">
          <Button on:click={handleDelete}>Delete</Button>
          <Button intent={"action"} on:click={toggleDeleteDialog}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
</Dialog>
