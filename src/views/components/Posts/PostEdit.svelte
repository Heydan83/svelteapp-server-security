<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { requestStatus } from "../../../entities/_libs";
  import { TextColorTypes } from "../../_libs";
  import { push } from "svelte-spa-router";
  import LoadingSpinner from "../LoadingSpinner.svelte";
  import autStore from "../../../entities/auth/authController";
  import postStore, {
    postGetStatus,
    postPutStatus,
  } from "../../../entities/post/postController";
  import modalStore from "../../../entities/modal/modalController";
  import inLineMessageStore from "../../../entities/inLineMessage/inLineMessageController";
  import InlineMessage from "../InlineMessage.svelte";

  export let params = {};

  let id = "";
  let title = "";
  let body = "";
  let readOnly = true;

  function cancelEdit() {
    readOnly = true;
    id = $postStore.id;
    title = $postStore.title;
    body = $postStore.body;
  }

  $: if (params?.id) {
    postStore.postGet($autStore.accessToken, params.id);
  }

  $: if ($postStore && $postGetStatus === requestStatus.REQUEST_SUCCESS) {
    id = $postStore.id;
    title = $postStore.title;
    body = $postStore.body;
  }

  $: if ($postGetStatus === requestStatus.REQUEST_SUCCESS)
    postGetStatus.reset();

  $: if ($modalStore.response) {
    readOnly = true;
    modalStore.modalClose();
    postStore.postPost($autStore.accessToken, id, title, body, $autStore.id);
  }

  onMount(() => {
    modalStore.modalSet(
      "Modifying post",
      "Are you sure you want to save the changes?",
      "No",
      "Yes"
    );
  });
</script>

{#if $postGetStatus === requestStatus.NO_REQUEST}
  <div class="container container-centered" in:fade={{ duration: 180 }}>
    {#if params?.id}
      <p class="h2" style="padding-bottom: 1rem;">Editing post</p>
    {:else}
      <p class="h2" style="padding-bottom: 1rem;">New post</p>
    {/if}
    <form on:submit|preventDefault={modalStore.modalShow}>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <textarea
          class="form-control"
          id="title"
          rows="3"
          placeholder="Write post title"
          {readOnly}
          bind:value={title}
        />
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">Body</label>
        <textarea
          class="form-control"
          id="body"
          rows="10"
          placeholder="Write post body"
          bind:value={body}
          {readOnly}
        />
      </div>
      {#if $postPutStatus !== requestStatus.REQUESTING}
        {#if readOnly}
          <button
            type="button"
            class="btn btn-secondary"
            on:click={() => push("/posts")}>Go Back</button
          >
          <button
            type="button"
            class="btn btn-primary"
            on:click={() => (readOnly = false)}>Edit</button
          >
        {:else}
          <button type="button" class="btn btn-secondary" on:click={cancelEdit}
            >Cancel</button
          >
          <button
            type="button"
            class="btn btn-primary"
            on:click={modalStore.modalShow}>Save</button
          >
        {/if}
      {:else}
        <div in:fade={{ duration: 180 }}>
          <LoadingSpinner spinnerColorType={TextColorTypes.PRIMARY.name} />
        </div>
      {/if}
      {#if $inLineMessageStore.message}
        <InlineMessage />
      {/if}
    </form>
  </div>
{/if}
{#if $postGetStatus === requestStatus.REQUESTING}
  <div class="centered-container container" in:fade={{ duration: 180 }}>
    <LoadingSpinner spinnerColorType={TextColorTypes.PRIMARY.name} />
  </div>
{/if}

<style>
  .container {
    align-content: center;
    align-items: center;
    width: 25rem;
    height: 20rem;
    padding-top: 5rem;
    padding-bottom: 10rem;
  }
</style>
