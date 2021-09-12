<template>
  <section>
    <div id='show-auth' />
  </section>
</template>

<script>
export default {
  mounted() {
    this.$auth0.showLock('show-auth');
  }
};
</script>
