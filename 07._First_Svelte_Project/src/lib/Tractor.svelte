<script lang="ts">
    export let wheels: string[];
</script>

<h1>Tractor</h1>
{#each wheels as wheel}
    <p>{wheel}</p>
{/each}