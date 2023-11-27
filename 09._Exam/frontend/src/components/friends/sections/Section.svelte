<script lang="ts">
  export let sectionName: string;
</script>

<div class="flex flex-col space-y-2">
  <div class="text-xs text-message-date font-bold uppercase">
    {sectionName}
  </div>
  <slot />
</div>
