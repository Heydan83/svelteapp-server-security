<script>
  import { fade } from "svelte/transition";
  import { push } from "svelte-spa-router";
  import LoadingSpinner from "./components/LoadingSpinner.svelte";
  import postsStore, { postsStatus } from "../entities/posts/postsController";
  import { requestStatus } from "../entities/_libs";
  import { TextColorTypes } from "./_libs";
  import PostCard from "./components/Posts/PostCard.svelte";

  // Stores
  import authStore from "../entities/auth/authController";

  $: if ($authStore.isAuthenticated)
    postsStore.postsGet($authStore.accessToken);
</script>

<div in:fade={{ duration: 180 }} style="margin-top: 1rem;">
  <button
    type="button"
    class="btn btn-primary"
    on:click={() => push("/posts/new")}>Add new post</button
  >
</div>
{#if $postsStatus === requestStatus.REQUEST_SUCCESS}
  <div class="container" in:fade={{ duration: 180 }}>
    {#each $postsStore as post (post.id)}
      <div class="container-fluid" style="padding-bottom: 1rem;">
        <PostCard {...post} />
      </div>
    {/each}
  </div>
{:else if $postsStatus === requestStatus.REQUESTING}
  <div class="centered-container" in:fade={{ duration: 180 }}>
    <LoadingSpinner spinnerColorType={TextColorTypes.PRIMARY.name} />
  </div>
{/if}
<div in:fade={{ duration: 180 }} style="margin-bottom: 1rem;">
  <button
    type="button"
    class="btn btn-primary"
    on:click={() => push("/posts/new")}>Add new post</button
  >
</div>

<style>
  .container {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
</style>
