<script>
  import { link } from "svelte-spa-router";
  import NavBarLink from "./NavBarLink.svelte";

  let collapseNavBar = false;
  let areaExpanded = false;
  let collapsed = true;

  const navBarMenu = [
    { linkTo: "/", linkToText: "Home" },
    { linkTo: "/posts", linkToText: "Posts" },
    { linkTo: "/users", linkToText: "Users" },
  ];

  const openMenu = () => {
    collapseNavBar = !collapseNavBar;
    areaExpanded = !areaExpanded;
    collapsed = !collapsed;
  };
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/" use:link>Postit</a>
    <button
      class="navbar-toggler"
      class:collapsed
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded={areaExpanded}
      aria-label="Toggle navigation"
      on:click={openMenu}
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      class="collapse navbar-collapse"
      class:show={collapseNavBar}
      id="navbarNavAltMarkup"
    >
      <div class="navbar-nav">
        {#each navBarMenu as menu}
          <NavBarLink {...menu} />
        {/each}
      </div>
    </div>
  </div>
</nav>
