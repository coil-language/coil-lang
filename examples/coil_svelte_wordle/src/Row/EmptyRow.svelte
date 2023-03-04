<script lang="coil">
  import Row from "./Row.svelte"
  let matched = (0..5).fill(:empty)
</script>

<Row word="" {matched} />
