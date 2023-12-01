<script lang="ts">
  import { PenSquare } from "lucide-svelte";
</script>

<div class="space-y-2">
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-white text-xl font-bold">Active chats</h3>
    <PenSquare size={19} color={"white"} class="cursor-pointer" />
  </div>
  <input
    class="w-full bg-message-inputField rounded-md border border-border px-3 py-2 text-sm focus:outline-none text-white"
    placeholder="Search active conversations..."
  />
</div>
