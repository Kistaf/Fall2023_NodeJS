<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  const edit = () => (editing = true);

  const submit = () => {
    if (text !== original) {
      dispatch("submit", text);
    }
    editing = false;
  };

  const focus = (element: HTMLInputElement) => element.focus();

  onMount(() => {
    original = text;
  });

  let original: string = "";
  let editing = false;
  export let text: string;
</script>

{#if editing}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <form on:submit|preventDefault={submit}>
    <input
      class="bg-input border text-foreground text-sm font-normal border-border flex-none rounded-lg px-2 py-1 focus:outline-none"
      bind:value={text}
      on:blur={submit}
      use:focus
    />
  </form>
{:else}
  <button on:click={edit}>
    {#if text}
      {text}
    {:else}
      No conversation title
    {/if}
  </button>
{/if}
