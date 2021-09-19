<template>
  <section class='container'>
    <div>
      <div v-if='loggedIn()' class='content'>
        <h2>ログイン中です</h2>
        <nuxt-link to='/logout'>
          <span class='icon'>
            <i class='fa fa-sign-out'/>
          </span>
          <span>
            ログアウト
          </span>
        </nuxt-link>
      </div>

      <div v-if='!loggedIn()' class='content'>
        <h2>ログインしてください</h2>
        <nuxt-link to='/login'>
          <span class='icon'>
            <i class='fa fa-sign-in'/>
          </span>
          <span>
            ログイン
          </span>
        </nuxt-link>
        <button @click='ping'>ping</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    loggedIn() {
      return this.$auth0.isAuthenticated();
    },
    async ping() {
      const ret = await this.$axios.$get('/api/v1/ping')
      console.log({ret});
    }
  }
}
</script>
