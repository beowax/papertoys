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

    // donnée base64 à ajouter et mapper avec le panel3D
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
      
      //this.$store.commit('updateMap', {b64: 'data:image/jpeg;base64,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'})
      //this.$store.commit('updateb64texture', {b64: 'data:image/jpeg;base64,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'})

      /* Utiliser Easeljs
      
      Canevac : crer un groupe
        background
        shape chargée avce les elements drad and dropé : pour rotation, etc...
        
        pour transformer en base 64 pour la map https://stackoverflow.com/questions/34640596/how-do-i-retrieve-raw-bitmap-data-from-html5-canvas-using-javascript


      
      */

      // ON crée le canevas à la volée
      this.container = document.getElementById('pattern');
      var canvas = document.createElement('canvas');
        canvas.id     = "canevas2d";
        //canvas.width  = this.container.offsetWidth;
        //canvas.height = window.innerHeight;
        canvas.width  = 1024;
        canvas.height = 1024;
        
        canvas.style.zIndex   = 8;
        canvas.classList.add("dropzone");
      this.container.appendChild(canvas);

      //Create a stage by getting a reference to the canvas
      this.stage = new createjs.Stage("canevas2d");
      this.container = new createjs.Container();

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
        
        // On MAJ l'objet de mapping
        this.stage.addChild(this.container);
        
        // On demande la MAJ du canevas
        this.updateCanvas();

      }, this);

      document.addEventListener("dragstart", function(event) {
        // The dataTransfer.setData() method sets the data type and the value of the dragged data
        var draggedData = '{'+
          '"posX":"' + event.pageX + '" ,' +
          '"posY":"' + event.pageY + '" ,' +
          '"src":"' + event.target.src + '"' +
        '}';

        event.dataTransfer.setData("draggedData", draggedData);
        
        // Output some text when starting to drag the p element
        //document.getElementById("demo").innerHTML = "Started to drag the p element.";

        // Change the opacity of the draggable element
        event.target.style.opacity = "0.4";
      });

      document.addEventListener("dragenter", function(event) {
        if ( event.target.className == "dropzone" ) {
          event.target.style.background = "purple";
        }
      });

      document.addEventListener("dragleave", function(event) {
        if ( event.target.className == "dropzone" ) {
          event.target.style.background = "";
        }
      });

      // Ce qui se passe à la fin du drag/drop
      document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "1";
      });

      // By default, data/elements cannot be dropped in other elements.
      // To allow a drop, we must prevent the default handling of the element
      document.addEventListener("dragover", function(event) {
        event.preventDefault();
      });

      document.addEventListener("drop", function(event) {
        event.preventDefault();
        if (event.target.className == "dropzone" ) {
          event.target.style.background = "";
          
          var draggedData = JSON.parse(event.dataTransfer.getData("draggedData"));
          var bitmapInstance = new createjs.Bitmap(draggedData.src);
          
          bitmapInstance.x = event.pageX - document.getElementById('canevas2d').offsetLeft - draggedData.posX +1;
          bitmapInstance.y = event.pageY - document.getElementById('canevas2d').offsetTop - draggedData.posY +1;
          bitmapInstance.scale = 30/340;
          this.container.addChild(bitmapInstance);

          bitmapInstance.on("mousedown", function (evt) {
            this.parent.addChild(this);
            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
          });
    
          // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
          bitmapInstance.on("pressmove", function (evt) {
            this.x = evt.stageX + this.offset.x;
            this.y = evt.stageY + this.offset.y;
            // KO : this ne peut pas être bindé comme ça... :(
            //this.updateCanvas();
          });

          // On ajoute l'image qu'on a droppé
          this.stage.addChild(this.container);

          // Et on demande la MAJ du canvas
          this.updateCanvas();

        }
      }.bind(this));

    },
    methods:{
      updateCanvas() {
          this.stage.update();
          this.$store.commit('updateb64texture', {b64: document.getElementById('canevas2d').toDataURL("image/jpeg")})
        }
      }, 
      computed : {
          getb64texture() {
          return this.$store.state.b64texture
          }
      },
      watch : {
        getb64texture(value) {
          console.log("B64texture changed (2D panel")
        }
      }


  }

 

  
</script>