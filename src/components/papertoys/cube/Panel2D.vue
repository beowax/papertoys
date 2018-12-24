<template>
  <div class="grid-1">
    <Toolbar/>
    <div id="pattern">
    </div>
  </div>
</template>

<script>
  import Toolbar from '../../tools/Toolbar.vue'
  export default {
    name: 'Panel2D',

      data () {
        return {
          stage: null,
          container: null,
          update:false
        }
      },
    components: {
      Toolbar
    },
    mounted() {
      
      /* Utiliser Easeljs
      
      http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
      ? Est il possible de mettre les eventemet drag/dop sur les elements DOM plutot que sur document spécifqiue ?
      */

      // ON crée le canvas à la volée
      var canvas = document.createElement('canvas');
        canvas.id     = "canvas2d";
        //canvas.width  = this.container.offsetWidth;
        //canvas.height = window.innerHeight;
        canvas.width  = 1024;
        canvas.height = 1024;
        canvas.style.zIndex   = 8;
        canvas.classList.add("dropzone");
        //canvas.classList.add("drawzone");
      
      // On l'ajoute au DOM
      document.getElementById('pattern').appendChild(canvas);

      //Create a stage by getting a reference to the canvas
      this.stage = new createjs.Stage("canvas2d");
      this.$store.commit('updateStage', {stage: this.stage})

      this.container = new createjs.Container();
      this.$store.commit('updateStageContainer', {stageContainer: this.container})

      // On doit gérer le load du Bitmap dans une queue
      var queue = new createjs.LoadQueue(false);
      queue.loadManifest([
        {
          id: "UVMap",
          src:'static/png/cube.png'
        }
      ]);

      queue.on("complete", function() {
        // All assets are now loaded.
        var bitmapInstance = new createjs.Bitmap(queue.getResult("UVMap"));
        this.container.addChild(bitmapInstance);
        this.container.x = 0;
        // On ajoute au container et on AMJ le stage
        this.stage.addChild(this.container);
        this.updateCanvas();
      }, this);



      



    },
    methods:{
      updateCanvas() {
          this.stage.update();
          this.$store.commit('updateb64texture', {b64: document.getElementById('canvas2d').toDataURL("image/jpeg")})
        }
    }, 
    computed : {
          getb64texture() {
            return this.$store.state.b64texture
          }
          
    }/*,
      watch : {
        getb64texture(value) {
          console.log("B64texture changed (2D panel")
        }
        
      }*/



}

 

  
</script>