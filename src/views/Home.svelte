<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { link } from "svelte-spa-router";

  // Stores
  import authStore from "../entities/auth/authController";

  let showComponent = false;

  onMount(() => {
    showComponent = true;
    return () => (showComponent = false);
  });
</script>

{#if showComponent}
  <div in:fade={{ duration: 180 }} class="container">
    <div class="container-lg center">
      <h2>Welcome to Postit, the app to connect with the world</h2>
      <br /><br />
      <p class="paragraph">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        tempora eaque provident similique eum quisquam accusamus quas odit ex,
        nulla quos eos numquam voluptatem iste harum deserunt quibusdam vel
        voluptates totam, laudantium illo? Aperiam quis vero maxime consequatur
        provident, possimus officia sed ad soluta porro accusantium quod
        suscipit accusamus quibusdam!
      </p>
      <p class="paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aliquam
        eligendi earum quisquam perspiciatis? Nihil quisquam harum, nostrum quam
        soluta molestias ducimus, reiciendis laudantium temporibus adipisci a
        nemo rem minus provident, ipsa autem quos vero. Facilis optio alias
        dolorum molestias perferendis eos provident expedita ipsum corrupti hic
        id eligendi dolorem eius nam labore aspernatur ducimus cupiditate rerum
        quisquam quo, voluptas quaerat ab doloribus exercitationem? Natus rem
        accusamus est aliquam labore adipisci quasi similique nobis architecto.
        Atque possimus ullam necessitatibus dolores officiis obcaecati iure iste
        illo eveniet provident laborum distinctio consequatur dicta aliquid
        libero odio quod esse, pariatur doloribus? Deserunt, consequatur!
      </p>
      <p class="paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed porro
        mollitia magni, corporis tenetur a quibusdam, eligendi minus ipsum id
        rem eos explicabo. Corrupti ratione nam eius cum neque unde quis atque
        nihil, necessitatibus, commodi aspernatur nesciunt, voluptas non id
        cumque hic iusto molestiae illum. Labore beatae temporibus expedita
        reiciendis aperiam enim harum, veniam accusantium! Ipsum neque quia
        culpa, numquam cupiditate rem voluptate tempore quam molestiae?
        Inventore perspiciatis ipsam deleniti saepe maiores ad at beatae.
        Possimus enim officiis laborum laboriosam necessitatibus voluptates
        consectetur placeat. Soluta fugiat fugit sit aut eligendi!
      </p>
      {#if !$authStore.isAuthenticated}
        <p>Click <a href="/login" use:link>here</a> to login</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .center {
    text-align: center;
    padding-bottom: 1rem;
  }

  .container {
    width: 100%;
    height: 100%;
    padding-top: 4rem;
    padding-bottom: 10rem;
  }
</style>
