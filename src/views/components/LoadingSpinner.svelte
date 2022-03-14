<script>
  import { onMount } from "svelte";
  import { TextColorTypes, getClassFromTextColorType } from "../_libs";

  export let spinnerColorType = "";
  let spinnerClass = "";

  onMount(() => {
    if (spinnerColorType)
      spinnerClass = getClassFromTextColorType(spinnerColorType);
  });
</script>

<div class={`spinner-border ${spinnerClass}`} role="status">
  <span class="visually-hidden">Loading...</span>
</div>
