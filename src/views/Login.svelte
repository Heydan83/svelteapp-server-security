<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { replace } from "svelte-spa-router";
  import authStore, { authStatus } from "../entities/auth/authController";
  import inLineMessageStore from "../entities/inLineMessage/inLineMessageController";
  import { requestStatus } from "../entities/_libs";
  import { TextColorTypes } from "./_libs";
  import InlineMessage from "./components/InlineMessage.svelte";
  import LoadingSpinner from "./components/LoadingSpinner.svelte";

  let showComponent = false;

  let userName = "";
  let email = "";

  onMount(() => {
    showComponent = true;
    return () => (showComponent = false);
  });

  $: if ($authStatus === requestStatus.REQUEST_SUCCESS) {
    if ($authStore.locationBeforeRedirecting !== "") {
      replace($authStore.locationBeforeRedirecting);
      authStatus.reset();
      authStore.authResetLocationBeforeRedirecting();
    } else {
      replace("/");
      authStatus.reset();
      authStore.authResetLocationBeforeRedirecting();
    }
  }
</script>

{#if showComponent}
  <div in:fade={{ duration: 180 }} class="container">
    <form on:submit|preventDefault={authStore.authUser(userName, email)}>
      <div class="mb-3">
        <label for="username" class="form-label">User name</label>
        <input
          type="text"
          class="form-control"
          id="username"
          aria-describedby="emailHelp"
          bind:value={userName}
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          bind:value={email}
        />
      </div>
      {#if $authStatus !== requestStatus.REQUESTING}
        <button type="submit" class="btn btn-primary">Submit</button>
      {:else}
        <LoadingSpinner spinnerColorType={TextColorTypes.PRIMARY.name} />
      {/if}
    </form>
    {#if $inLineMessageStore.message}
      <InlineMessage />
    {/if}
  </div>
{/if}

<style>
  .container {
    align-content: center;
    align-items: center;
    width: 21rem;
    height: 20rem;
    padding-top: 10rem;
    padding-bottom: 10rem;
  }

  form {
    margin-bottom: 1rem;
  }
</style>
