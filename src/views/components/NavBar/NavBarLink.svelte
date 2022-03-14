<script>
  import { getContext } from "svelte";
  import { link } from "svelte-spa-router";
  import authStore from "../../../entities/auth/authController";

  // Context
  let location = getContext("location");

  export let linkTo = "";
  export let linkToText = "";

  const adminUrls = ["/users"];
  const logInUrls = ["/posts", "/users"];
  let hideLink = false;

  const calculateHide = () => {
    if (adminUrls.includes(linkTo) && $authStore.role != "Admin") {
      hideLink = true;
    } else if (logInUrls.includes(linkTo) && !$authStore.isAuthenticated) {
      hideLink = true;
    } else {
      hideLink = false;
    }
  };

  $: if ($authStore || $location) calculateHide();
</script>

<a
  class="nav-link"
  class:active={$location === linkTo}
  class:hideLink
  aria-current={$location === linkTo ? "page" : ""}
  href={linkTo}
  use:link>{linkToText}</a
>

<style>
  .hideLink {
    display: none;
  }
</style>
