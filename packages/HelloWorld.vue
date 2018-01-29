<template>
  <div class="mainContent">
      <img src="../assets/logo.png">
      <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mainContent{
        width:100%;
        height:100%;
        background-color: #b3d4db;
    }
</style>
