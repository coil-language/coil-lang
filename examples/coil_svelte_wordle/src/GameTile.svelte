<script lang="coil">
  export let small = false;
  export let state = "empty";

  let size = small::otherwise("large")
</script>

<div class="game-tile {size}" data-state={state}>
  <slot />
</div>

<style>
  @keyframes rotate {
    0% {
      background: white;
      border: 2px solid #878a8c;
      transform: rotateX(-180deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }

  @keyframes expand {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .game-tile.large {
    width: var(--sizeLarge);
    height: var(--sizeLarge);
    font-size: var(--sizeFontLrg);
  }

  .game-tile {
    font-weight: bolder;
    font-family: "Helvetica Neue";
    text-align: center;
    width: var(--sizeSmall);
    height: var(--sizeSmall);
    font-size: var(--sizeFontSm);
    margin: 0;
  }

  .game-tile[data-state="guess"] {
    animation-name: expand;
    animation-duration: 200ms;
    border: 2px solid #878a8c;
  }
  .game-tile[data-state="correct"] {
    animation-name: rotate;
    animation-duration: 1s;
    background: rgb(var(--green));
  }
  .game-tile[data-state="wrong_location"] {
    animation-name: rotate;
    animation-duration: 1s;
    background: rgb(var(--yellow));
  }
  .game-tile[data-state="incorrect"] {
    animation-name: rotate;
    animation-duration: 1s;
    background: rgb(var(--grey));
  }
  .game-tile:not([data-state="empty"], [data-state="guess"]) {
    color: white;
    border: 2px solid #00000000;
  }
  .game-tile[data-state="empty"] {
    border: 2px solid #878a8c;
  }
</style>
