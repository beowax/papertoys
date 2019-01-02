<template>
  <div id="toolbar">
     <Dragging plop="/static/toolbar/draggable/eyes/eye-1.svg"/>
     <Drawing/>
     <img src="/static/toolbar/actions/undo.svg" v-on:click="undo()" draggable="false" height="30" width="30" />
     <img src="/static/toolbar/actions/redo.svg" v-on:click="redo()" draggable="false" height="30" width="30" />
  </div>
</template>

<script>
  import Dragging from './Dragging.vue'
  import Drawing from './Drawing.vue'
  export default {
    name: 'Toolbar',
    data () {
      return {
        undoIsActive: false
      }
    },
    components: {
      Dragging,
      Drawing
    },
    computed: {
      stage() {
        return this.$store.state.stage
      },
      container() {
        return this.$store.state.stageContainer
      },
      redoIsActive() {
        return this.$store.state.redoIsActive
      }
    },
    mounted() {

    },
    methods: {
      undo() {
        var i = this.container.children.length -1;
        var done = false;
        while (i > 0 && !done) {
          if (this.container.children[i].visible == true) {
            this.container.children[i].visible = false
            this.updateCanvas();
            done = true;
            if (!this.redoIsActive) {
                this.$store.commit('updateRedoIsActive', {isActive: true})
            }
          }
          i--;
        }
      },
      redo() {
        if(this.redoIsActive) {
          var i = 1;
          var done = false;
          while (i < this.container.children.length && !done) {
            if (this.container.children[i].visible == false) {
              this.container.children[i].visible = true
              this.updateCanvas();
              done = true;
            }
            i++;
          }
        }
      },
      updateCanvas() {
        this.stage.update();
        this.$store.commit('updateb64texture', {b64: document.getElementById('canvas2d').toDataURL("image/jpeg")})
      }
    },
    watch: {
      redoIsActive(value) {
        if (this.redoIsActive == false) {
          var i = this.container.children.length -1;
          while (i > 0) {
            if (this.container.children[i].visible == false) {
              this.container.children.splice(i,1)
            }
            i--;
          }
        }
      }
    }
  }
</script>