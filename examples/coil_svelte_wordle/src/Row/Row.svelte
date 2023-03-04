<script lang="coil">
  import GameTile from "../GameTile.svelte";
  export let state = null;
  export let word = "";
  export let matched = [];
</script>

<main class="game-tile-row" data-state={state}>
  {#each word.padEnd(5) as letter, i}
    <GameTile state={matched[i]}>{letter}</GameTile>
  {/each}
</main>

<style>
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
  .game-tile-row {
    display: flex;

    gap: 0.5em;
  }
  .game-tile-row[data-state="shaking"] {
    animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
</style>
