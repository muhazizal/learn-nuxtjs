<template>
  <div>
    <TheHeader @sidenav-toggle="displaySidenav = !displaySidenav" />
    <TheSideNav :show="displaySidenav" @close="displaySidenav = false" />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSideNav from "@/components/Navigation/TheSideNav";

export default {
  components: {
    TheHeader,
    TheSideNav
  },

  data: () => ({
    displaySidenav: false
  })
};
</script>

<style>
html {
  font-family: "Open Sans", sans-serif;
}

body {
  margin: 0;
}
</style>
