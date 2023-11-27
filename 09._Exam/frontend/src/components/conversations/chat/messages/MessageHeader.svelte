<script lang="ts">
  export let publisherUsername: string;
  export let publishedAt: Date;
</script>

<div class="flex flex-row items-center space-x-2">
  <h3 class="text-message-username text-sm font-bold">
    {publisherUsername}
  </h3>
  <p class="text-xs text-message-date font-medium">
    {publishedAt.toLocaleDateString()}
  </p>
</div>
