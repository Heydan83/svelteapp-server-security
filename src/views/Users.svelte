<script>
  // Libraries
  import { onMount, getContext } from "svelte";
  import { fade } from "svelte/transition";

  // Components
  import LoadingSpinner from "./components/LoadingSpinner.svelte";

  // Context
  let location = getContext("location");

  // Stores
  import authStore, { authStatus } from "../entities/auth/authController";

  let showComponent = false;

  onMount(() => {
    showComponent = true;
    return () => (showComponent = false);
  });
</script>

<!-- {#if $authStatus === requestStatus.REQUESTING} -->
<!-- <LoadingSpinner spinnerColorType={TextColorTypes.PRIMARY.name} /> -->
{#if showComponent}
  <p in:fade={{ duration: 180 }}>Users</p>
{/if}
