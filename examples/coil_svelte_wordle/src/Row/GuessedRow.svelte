<script lang="coil">
  import Row from "./Row.svelte"
  export let word = ""

  let WORD_OF_THE_DAY = "OHYEA"::as_array()

  $: matched = WORD_OF_THE_DAY::zip(word)
    ::map(fn (letter, char) = ~Match{
      letter => :correct
      WORD_OF_THE_DAY::as_set() => :wrong_location
      _ => :incorrect
    }::call(char))
</script>

<Row {word} {matched} />
