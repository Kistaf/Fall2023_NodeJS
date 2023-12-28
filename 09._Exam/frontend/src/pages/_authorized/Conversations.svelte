<script lang="ts">
  import ConversationsPanel from "../../components/conversations/sidebars/conversations-panel/ConversationsPanel.svelte";
</script>

<div class="flex flex-row">
  <ConversationsPanel />
  <div
    class="flex-1 h-screen w-full bg-background border-l-[1px] border-r-[1px] border-border"
  >
    <div
      class="w-full h-full flex justify-center items-center text-foreground font-semibold"
    >
      No conversation selected
    </div>
  </div>
</div>
