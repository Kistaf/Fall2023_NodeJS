<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";
  import { cva, type VariantProps } from "class-variance-authority";

  const img = cva("rounded-full", {
    variants: {
      size: {
        default: "w-10 h-10",
        normal: "w-12 h-12",
      },
    },
  });

  interface $$Props extends HTMLImgAttributes, VariantProps<typeof img> {
    url: string;
  }

  export let size: $$Props["size"] = "default";
  export let url: string;
</script>

<img src={url} alt="avatar" class={img({ size, class: $$props.class })} />
