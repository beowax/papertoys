<template>
    <div class="grid-2">
        <Panel2D/>
        <Panel3D/>
    </div>
</template>

<script>
  import Panel2D from './papertoys/cube/Panel2D.vue'
  import Panel3D from './papertoys/cube/Panel3D.vue'

  export default {
    name: 'Workspace',
    components: {
      Panel2D,
      Panel3D
    }
    
  }
  
  
  

</script>