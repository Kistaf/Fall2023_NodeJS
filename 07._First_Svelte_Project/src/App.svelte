<script lang="ts">
    import Tractor from "./lib/Tractor.svelte";
    let showTractor: boolean = false

    const wheels = ["Wheel 1", "Wheel 2", "Wheel 3", "Wheel 4"]
</script>

<button on:click={() => showTractor = !showTractor}>Show tractor</button>

{#if showTractor}
    <Tractor {wheels}/>
{/if}