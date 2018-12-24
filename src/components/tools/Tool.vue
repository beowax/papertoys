<template>
  <img v-bind:src="plop" class="draggable" draggable="true" height="30" width="30" />
</template>

<script>
  export default {
    props: ['plop'],
    name: 'Tool',
    data () {
      return {
        noplop: '#'
      }
    },
    mounted() {
      document.addEventListener("dragstart", function(event) {
        if (!this.isDrawmode) {
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
        }
      }.bind(this));

      document.addEventListener("dragenter", function(event) {
        if (!this.isDrawmode) {
          if ( event.target.className == "dropzone" ) {
            event.target.style.background = "purple";
          }
        }
      }.bind(this));

      document.addEventListener("dragleave", function(event) {
        if (!this.isDrawmode) {
          if ( event.target.className == "dropzone" ) {
            event.target.style.background = "";
          }
        }
      }.bind(this));

      // Ce qui se passe à la fin du drag/drop
      document.addEventListener("dragend", function(event) {
        if (!this.isDrawmode) {
          event.target.style.opacity = "1";
        }
      }.bind(this));

      // By default, data/elements cannot be dropped in other elements
      // To allow a drop, we must prevent the default handling of the element
      document.addEventListener("dragover", function(event) {
        event.preventDefault();
      });

      document.addEventListener("drop", function(event) {
        if (!this.isDrawmode) {
          event.preventDefault();
          if (event.target.className == "dropzone" ) {
            event.target.style.background = "";

            var draggedData = JSON.parse(event.dataTransfer.getData("draggedData"));
            var bitmapInstance = new createjs.Bitmap(draggedData.src);
            var self = this;

            bitmapInstance.x = event.pageX - document.getElementById('canvas2d').offsetLeft - draggedData.posX +1;
            bitmapInstance.y = event.pageY - document.getElementById('canvas2d').offsetTop - draggedData.posY +1;
            bitmapInstance.scale = 30/340;
            this.container.addChild(bitmapInstance);

            bitmapInstance.on("mousedown", function (evt) {
              if (!self.isDrawmode) {
                this.parent.addChild(this);
                this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
              }
            });

            // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
            bitmapInstance.on("pressmove", function (evt) {
              if (!self.isDrawmode) {
                this.x = evt.stageX + this.offset.x;
                this.y = evt.stageY + this.offset.y;
                // KO : this ne peut pas être bindé comme ça... :(
                self.updateCanvas();
              }
            });

            // On ajoute l'image qu'on a droppé
            this.stage.addChild(this.container);

            // Et on demande la MAJ du canvas
            this.updateCanvas();

          }
        }
      }.bind(this));


    },
    methods:{
      updateCanvas() {
        this.stage.update();
        this.$store.commit('updateb64texture', {b64: document.getElementById('canvas2d').toDataURL("image/jpeg")})
      }
    },
    computed: {
      isDrawmode() {
        return this.$store.state.isDrawmode
      },
      stage() {
        return this.$store.state.stage
      },
      container() {
        return this.$store.state.stageContainer
      }
    }
  }
</script>