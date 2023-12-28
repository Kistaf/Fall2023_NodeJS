<script lang="ts">
  import { cn } from "../../utils/utils";

  export let className: string = "";
</script>

<div class={cn("animate-pulse rounded-md bg-muted", className)} />
