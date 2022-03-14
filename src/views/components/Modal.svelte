<script>
  import { slide } from "svelte/transition";
  import modalStore from "../../entities/modal/modalController";
</script>

{#if $modalStore.show}
  <div
    class={`modal fade ${$modalStore.show ? "displayBlock" : "displayNone"}`}
    class:show={$modalStore.show}
    id="global-modal"
    tabindex="-1"
    aria-labelledby="global-modal"
    aria-hidden={!$modalStore.show}
    aria-modal={$modalStore.show}
    role={$modalStore.show ? "dialog" : ""}
    in:slide={{ delay: 150, duration: 1200 }}
    out:slide={{ duration: 300 }}
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {$modalStore.title}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            on:click={modalStore.modalClose}
          />
        </div>
        <div class="modal-body">{$modalStore.body}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            on:click={modalStore.modalClose}>{$modalStore.btnFalseText}</button
          >
          <button
            type="button"
            class="btn btn-primary"
            on:click={() => modalStore.modalSetResponse(true)}
            >{$modalStore.btnTrueText}</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .displayNone {
    display: none;
  }

  .displayBlock {
    display: block;
  }
</style>
