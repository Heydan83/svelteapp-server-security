<script>
  import Router, { location, push } from "svelte-spa-router";
  import { setContext } from "svelte";
  import { fade } from "svelte/transition";
  import NavBar from "./views/components/NavBar/NavBar.svelte";
  import { requestStatus } from "./entities/_libs";
  import Home from "./views/Home.svelte";
  import Posts from "./views/Posts.svelte";
  import Login from "./views/Login.svelte";
  import Users from "./views/Users.svelte";
  import PostEdit from "./views/components/Posts/PostEdit.svelte";
  import Modal from "./views/components/Modal.svelte";
  import modalStore from "./entities/modal/modalController";
  // import { noNeedCredentials } from "./views/_libs";

  // Stores
  import authStore, {
    authStatus,
    authStatusVerify,
  } from "./entities/auth/authController";

  const routes = {
    "/": Home,
    "/login": Login,
    "/posts": Posts,
    "/posts/new/": PostEdit,
    "/posts/:id": PostEdit,
    "/users": Users,
  };

  setContext("location", location);

  $: if ($location) authStore.authVerifyUser();

  $: if (
    !$authStore.isAuthenticated &&
    $location !== "/login" &&
    $location !== "/" &&
    $authStatusVerify !== requestStatus.REQUESTING
  ) {
    if ($authStore.locationBeforeRedirecting === "")
      authStore.authSetLocationBeforeRedirecting($location);
    authStatusVerify.reset();
    push("/login");
  } else authStatusVerify.reset();

  $: console.log("authStore: ", $authStore);
  $: console.log("authStatus: ", $authStatus);
  $: console.log("authStatusVerify: ", $authStatusVerify);
</script>

<!-- <button on:click={modalStore.modalShow}>Show modal</button> -->

<NavBar />
<div class="container">
  <Modal />
  <Router {routes} />
  {#if $modalStore.show}
    <div
      class={$modalStore.show ? "modal-backdrop fade show" : ""}
      transition:fade={{ duration: 300 }}
    />
  {/if}
</div>

<style>
  .container {
    height: 100vh;
  }
</style>
