<script lang="coil">
  import GuessedRow from "./Row/GuessedRow.svelte";
  import ActiveRow from "./Row/ActiveRow.svelte";
  import EmptyRow from "./Row/EmptyRow.svelte";

  let guesses = []
  let active = 0

  $: rows = Array(6)
    .fill("")
    ::map_with_index(fn (_, i) = guesses[i] || "");

  fn on_key_down(e) {  
    guesses[active] ||= ""
    if e.key == "Enter" && guesses[active]::len() == 5  {
      active += 1
      guesses[active] = ""
    } else if e.key == "Backspace" {
      guesses[active] = guesses[active].slice(0, -1)
    } else if e.key.trim()::len() != 1 {
      return null
    } else if guesses[active]::len() < 5 {
      guesses[active] += e.key.toUpperCase()
    }
  }
</script>

<svelte:window on:keydown={on_key_down} />

<div class="guesses">
  {#each rows as word, i}
    {#if i < guesses.length - 1}
      <GuessedRow {word} />
    {:else if i === guesses.length - 1}
      <ActiveRow {word} />
    {:else}
      <EmptyRow />
    {/if}
  {/each}
</div>

<style>
  .guesses {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 100%;
    height: 80%;
    justify-content: center;
    align-items: center;
  }
</style>
