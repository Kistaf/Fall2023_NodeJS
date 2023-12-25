<script lang="ts">
  import dayjs from "dayjs";
  export let email: string;
  export let createdDate: Date;

  const formattedCreateDate = () => dayjs(createdDate).format("MMMM, dddd D");
</script>

<div
  class="flex flex-row w-full h-[90px] justify-between items-center rounded-lg px-6 py-4 text-white bg-muted"
>
  <div class="flex flex-row space-x-4">
    <div class="w-12 h-12 rounded-full bg-avatar" />
    <div class="flex flex-col justify-center">
      <h3 class="text-secondary-foreground">{email}</h3>
      <p class="text-sm text-muted-foreground">Since {formattedCreateDate()}</p>
    </div>
  </div>

  <!-- Actions -->
  <div class="flex flex-row space-x-2">
    <slot />
  </div>
</div>
