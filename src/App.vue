<template>
  <div id="content">
    <appHeader/>
    <main>
      <router-view/>
    </main>  
    <appFooter/>
  </div>
</template>

<script>
  import appHeader from './components/appHeader.vue'
  import appFooter from './components/appFooter.vue'
  
  export default {
    name: 'App',
    components: {
      appHeader,
      appFooter
    }
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
