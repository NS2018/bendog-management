<template>
  <div id="app">
    <!-- <AuthLogin/> -->
    <nav class="navbar">
      <router-link to="/auth">去登录</router-link> |
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

</style>
