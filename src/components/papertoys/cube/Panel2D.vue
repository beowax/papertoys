<template>
  <div class="grid-1">
    <div id="pattern">{{ msg }}</div>
  </div>
</template>

<script>
  export default {
    //name: 'PANEL2D',
    destination:'pattern',
    data () {
      return {
      msg: 'Message not mounted yet'
      }
    },
    mounted() {

    }
  }
</script>