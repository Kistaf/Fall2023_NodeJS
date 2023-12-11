<script lang="ts">
  import dayjs from "dayjs";
  import isToday from "dayjs/plugin/isToday";
  dayjs.extend(isToday);

  const formattedDate = () => {
    const isToday = dayjs().isToday();
    if (isToday) {
      return `Today at ${dayjs(publishedAt).format("H:mm A")}`;
    }
    return dayjs(publishedAt).format("MMMM D, YYYY H:mm A");
  };

  export let publisherUsername: string;
  export let publishedAt: Date;
</script>

<div class="flex flex-row items-center space-x-2">
  <h3 class="text-message-username text-sm font-bold">
    {publisherUsername}
  </h3>
  <p class="text-xs text-message-date font-medium">
    {formattedDate()}
  </p>
</div>
