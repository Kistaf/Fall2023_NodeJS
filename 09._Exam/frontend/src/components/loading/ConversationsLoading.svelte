<script>
  import Skeleton from "../ui/Skeleton.svelte";
</script>

<div class="flex flex-row w-full h-screen">
  <div
    class="flex flex-row border-r-[1px] border-border overflow-y-auto hide-native-scrollbar"
  >
    <div class="flex flex-col w-[300px] h-screen flex-none px-5 py-5 space-y-6">
      <div class="space-y-2">
        <div class="flex flex-row justify-between items-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
          <Skeleton className="w-[20px] h-[20px] rounded-lg" />
        </div>
        <Skeleton className="w-full rounded-md h-[35px]" />
      </div>
      <div class="flex flex-col space-y-4">
        {#each { length: 20 } as _, i}
          <Skeleton className="w-full h-[46px] rounded-md" />
        {/each}
      </div>
    </div>
  </div>
  <div class="flex-1 h-screen w-full bg-background">
    <div class="w-full h-screen flex flex-col px-6 py-4 space-y-2">
      <div class="mb-4 h-[40px]">
        <Skeleton className="w-[150px] h-[30px] mb-2" />
        <Skeleton className="w-full h-[1px] rounded-full" />
      </div>
      <div
        class="flex flex-1 w-full h-full overflow-y-auto hide-native-scrollbar"
      >
        <div class="w-full h-full flex flex-col-reverse justify-start">
          <div class="space-y-8">
            {#each { length: 20 } as _, i}
              <div class="flex flex-row w-full space-x-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div class="flex flex-col w-full space-y-2">
                  <div class="flex flex-row items-center space-x-2">
                    <Skeleton className="w-[80px] h-[15px]" />
                    <Skeleton className="w-[30px] h-[15px]" />
                  </div>
                  <Skeleton className="w-full h-[60px]" />
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div class="h-[70x]">
        <div class="h-full flex justify-end flex-col space-y-2">
          <Skeleton className="w-full h-[53px]" />
        </div>
      </div>
    </div>
  </div>
</div>
