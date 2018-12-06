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
          container: null
      
        }
      },
    components: {
      Toolbar
    },
    mounted() {
      
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
        canvas.width  = this.container.offsetWidth;
        canvas.height = window.innerHeight;
        canvas.style.zIndex   = 8;
        canvas.classList.add("dropzone");
      this.container.appendChild(canvas);

      //Create a stage by getting a reference to the canvas
      this.stage = new createjs.Stage("canevas2d");

      //Create a Shape DisplayObject.
      var circle = new createjs.Shape();
      circle.graphics.beginFill("red").drawCircle(0, 0, 40);
      //Set position of Shape instance.
      circle.x = circle.y = 50;
      //Add Shape instance to stage display list.
      
      this.container = new createjs.Container();
      var bitmapInstance = new createjs.Bitmap("static/png/cube.png");
      this.container.addChild(bitmapInstance, circle);
      this.container.x = 0;
      this.stage.addChild(this.container);

      //Update stage will render next frame
      this.stage.update();




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

      // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
      document.addEventListener("dragover", function(event) {
      event.preventDefault();
      });

      document.addEventListener("drop", function(event) {
        event.preventDefault();
        if (event.target.className == "dropzone" ) {
          event.target.style.background = "";

          var draggedData = JSON.parse(event.dataTransfer.getData("draggedData"));

          var bitmapInstance = new createjs.Bitmap(draggedData.src);
          this.container.addChild(bitmapInstance);
          
          bitmapInstance.x = event.pageX - document.getElementById('canevas2d').offsetLeft - draggedData.posX;
          bitmapInstance.y = event.pageY - document.getElementById('canevas2d').offsetTop - draggedData.posY;
          bitmapInstance.scale = 30/340;

          this.stage.addChild(this.container);
          this.stage.update();

        }
      }.bind(this));

     
    }
  }

 

  
</script>