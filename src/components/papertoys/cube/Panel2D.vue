<template>
  <div class="grid-1">
    <div id="pattern">
    </div>
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
      
      this.container = document.getElementById('pattern');

      var canvas = document.createElement('canvas');
      canvas.id     = "canevas2d";
      canvas.width  = this.container.offsetWidth;
      canvas.height = window.innerHeight;
      canvas.style.zIndex   = 8;
      
      var context = canvas.getContext('2d');

      var image = new Image();
      image.onload=function(){
        context.drawImage(image,0,0,canvas.width,canvas.height);
      };
      image.src="static/png/cube.png";

      this.container.appendChild(canvas);


     
    }
  }
</script>