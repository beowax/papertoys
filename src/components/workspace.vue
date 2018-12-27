<template>
    <div class="grid-2">
        <panel2D/>
        <panel3D/>
    </div>
</template>

<script>
  import panel2D from './papertoys/cube/Panel2D.vue'
  import panel3D from './papertoys/cube/Panel3D.vue'

  export default {
    name: 'Workspace',
    components: {
      panel2D,
      panel3D
    }
    
  }
  
  
  

</script>

<style>
#app {

  -moz-osx-font-smoothing: grayscale;

}
</style>
