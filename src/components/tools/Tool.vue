<template>
  <img v-bind:src="plop" class="draggable" draggable="true" height="30" width="30"/>
</template>

<script>
  export default {
    props: ['plop'],
    name: 'Tool',
    //src:null,
    data () {
      return {
      noplop: '#'
      }
    }
  }
</script>