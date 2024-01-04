<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cva, type VariantProps } from "class-variance-authority";
  import { Loader2 } from "lucide-svelte";

  const button = cva("transition-colors duration-200 rounded-md", {
    variants: {
      intent: {
        default: "text-primary-foreground bg-primary hover:bg-primary/80",
        action: "text-secondary-foreground bg-secondary hover:bg-secondary/80",
      },
      size: {
        default: "px-3 py-1",
        full: "w-full h-10 px-3 py-1",
      },
    },
  });

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
