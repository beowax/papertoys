<template>
  <div id="draggable">
    <img src="/static/toolbar/draggable/eyes/eye-1.svg" draggable="false" height="30" width="30" />
    <div id="draggable-tools" draggable="false">
      <img v-for="eye in this.items.eyes" v-bind:key="eye.index" :src="eye.src" class="draggable" draggable="true" v-bind:height="iconSize" v-bind:width="iconSize" :data-original-size="eye.originalSize"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['plop'],
    name: 'Dragging',
    data () {
      return {
        noplop: '#',
        iconSize: 30,
        items:{
          eyes:[
            { src: "/static/toolbar/draggable/eyes/eye-1.svg", originalSize: "340" },
            { src: "/static/toolbar/draggable/eyes/eye-2.svg", originalSize: "512" }
          ]
        }
      }
    },
    mounted() {
      document.addEventListener("dragstart", function(event) {
        this.$store.commit('updatedrawmode', {drawmode: false})
        if (!this.isDrawmode) {
          // The dataTransfer.setData() method sets the data type and the value of the dragged data
          //console.debug(event)
          //console.log("event.pageX:"+event.pageX+" // event.pageY:"+event.pageY)
          /*var draggedData = '{'+
            '"posX":"' + event.pageX + '" ,' +
            '"posY":"' + event.pageY + '" ,' +
            '"src":"' + event.target.src + '",' +
            '"ratio":"' + (30 / event.target.dataset.originalSize) + '"' +
          '}';*/
          //console.debug(draggedData)
          var draggedData = '{'+
            '"posX":"' + event.offsetX + '" ,' +
            '"posY":"' + event.offsetY + '" ,' +
            '"src":"' + event.target.src + '",' +
            '"ratio":"' + (this.iconSize / event.target.dataset.originalSize) + '"' +
          '}';
          console.debug(draggedData)
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
        this.$store.commit('updatedrawmode', {drawmode: true})
        event.target.style.opacity = "1";
        //if (!this.isDrawmode) {  
        //  event.target.style.opacity = "1";
        //}
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
            
            // On va devoir rendre ca dynamique ou mettre tous les stickers aux mêmes dimensions...
            bitmapInstance.scale = draggedData.ratio;
            
            if (this.redoIsActive) {
              this.$store.commit('updateRedoIsActive', {isActive: false})
            }
            

            this.container.addChild(bitmapInstance);

            bitmapInstance.on("mousedown", function (evt) {
              self.$store.commit('updatedrawmode', {drawmode: false})
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
                self.updateCanvas();
              }
            });
            
            bitmapInstance.on("pressup", function(evt) {
              console.log("pressup")
              self.$store.commit('updatedrawmode', {drawmode: true})
            })

            // Au survol
            bitmapInstance.on("rollover", function (evt) {
              console("Survol");
              this.scale = this.originalScale * 1.2;
              self.updateCanvas();
            });

            bitmapInstance.on("rollout", function (evt) {
              this.scale = this.originalScale;
              self.updateCanvas();
            });

            // On ajoute l'image qu'on a droppé
            this.stage.addChild(this.container);

            // Et on demande la MAJ du canvas
            this.updateCanvas();

          }
          //this.$store.commit('updatedrawmode', {drawmode: true})
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
      },
      redoIsActive() {
        return this.$store.state.redoIsActive
      }
    }
  }
</script>