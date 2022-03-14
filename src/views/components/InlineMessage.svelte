<script>
  import { slide } from "svelte/transition";
  import inLineMessageStore from "../../entities/inLineMessage/inLineMessageController";
</script>

{#if $inLineMessageStore.message}
  <div
    transition:slide={{ duration: 300 }}
    class={"alert " + $inLineMessageStore.class + " inline-message"}
    role="alert"
  >
    {$inLineMessageStore.message}
  </div>
{/if}

<style>
  .inline-message {
    margin-top: 1rem;
  }
</style>
