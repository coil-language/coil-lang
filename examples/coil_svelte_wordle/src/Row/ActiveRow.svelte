<script lang="coil">
  import Row from "./Row.svelte"
  export let word = ""

  let state = false
  let matched = (0..5).fill(:empty)

  @guard({key: "Enter"})
  fn on_key_down(_event) {
    if word::len() < 5 {
      state = :shaking
      setTimeout(#(state = ""), 200)
    }
  }
</script>

<svelte:window on:keydown={on_key_down} />

<Row {word} {matched} {state} />
