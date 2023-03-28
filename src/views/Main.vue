<template>
  <div>
    <Toolbars />
    <div class="px-5 mt-3">
    <router-view />
    </div>
    <!-- <Footers /> -->
  </div>
</template>

<script>
// import Footers from "../components/Footer";
import Toolbars from "../components/Toolbar";
export default {
  components: {
    // Footers,
    Toolbars,
  },
};
</script>

<style>
</style>
