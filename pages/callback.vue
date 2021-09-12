<template>
  <p>Singing in...</p>
</template>
<script>
export default {
  mounted() {
    this.$auth0.setTokenByQuery();
    // eslint-disable-next-line no-console
    console.log("login");
    this.$router.replace("/");
  }
}
</script>
