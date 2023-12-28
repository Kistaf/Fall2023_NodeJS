<script>
  import Skeleton from "../../ui/Skeleton.svelte";
</script>

<div class="w-full h-screen px-16 py-12 overflow-y-auto">
  <div class="mb-6">
    <div class="space-y-2 mb-6">
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[200px] h-[18px] rounded-full" />
    </div>
    <Skeleton className="w-full h-[45px] rounded-md" />
  </div>
  <Skeleton className="w-full h-[1px] rounded-full" />
  <div class="space-y-8 mt-6">
    {#each { length: 3 } as _, i}
      <div class="space-y-2 flex flex-col">
        <Skeleton className="w-[50px] h-[15px] rounded-full" />
        {#each { length: 2 } as _, i}
          <Skeleton className="w-full h-[90px] rounded-lg" />
        {/each}
      </div>
    {/each}
  </div>
</div>
