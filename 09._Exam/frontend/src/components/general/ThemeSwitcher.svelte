<script lang="ts">
  import themeStore from "../../stores/themeStore";
  import { Sun, Moon } from "lucide-svelte";
</script>

<button
  class="flex justify-center items-center hover:bg-background py-5 cursor-pointer"
  on:click={themeStore.toggleTheme}
>
  {#if $themeStore === "dark"}
    <Moon color={"white"} />
  {:else if $themeStore === "light"}
    <Sun color={"orange"} />
  {:else}
    <Sun color={"orange"} />
  {/if}
</button>
