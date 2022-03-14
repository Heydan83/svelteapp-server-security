<script>
  import { link } from "svelte-spa-router";

  export let userId = "";
  export let id = "";
  export let title = "";
  export let body = "";
</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <p class="card-text">{body}</p>
    <a href="/posts/{id}" class="btn btn-primary" use:link>Edit the post</a>
  </div>
</div>
