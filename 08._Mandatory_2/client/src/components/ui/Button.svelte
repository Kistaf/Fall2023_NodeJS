<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cva, type VariantProps } from "class-variance-authority";
  import { Loader2 } from "lucide-svelte";

  const button = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        intent: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        },
        size: {
          default: "h-10 px-4 py-2",
          full: "w-full h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
        },
      },
    },
  );

  interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {
    isLoading?: boolean;
  }

  export let intent: $$Props["intent"] = "default";
  export let size: $$Props["size"] = "default";
  export let isLoading: boolean = false;
</script>

<button
  on:click
  {...$$props}
  class={button({ intent, size, class: $$props.class })}
>
  {#if isLoading}
    <Loader2 class="animate-spin" />
  {:else}
    <slot />
  {/if}
</button>
