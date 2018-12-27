<template>
  <div id="drawing">
      <!--object class="svgClass" type="image/svg+xml" v-on:click="toggleDrawmode()" data="/static/toolbar/drawing/pencil.svg" draggable="false" height="30" width="30"></object-->
      <img class="active" type="image/svg+xml" src="/static/toolbar/drawing/pencil.svg" draggable="false" height="30" width="30" />
  </div>
</template>

<script>
export default {
    data () {
        return {
            stageLoaded: false,
            currentShape: [],
            oldX: 0,
            oldY: 0,
            oldMidX: 0,
            oldMidY: 0,
            touchPos: null,
            pencil: {
                size: 3,
                color: "#000000",
                stylingW: "round",
                stylingH: "round"
            },
            color: ["#000000", "#FF0000"],
            isActive: false,
            isMouseDown: false
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
    },
    mounted() {

        //this.canvas = document.getElementById(canvasid);
        //this.stage = new createjs.Stage("drawing");
        //this.stage.autoClear = true;
        //this.stage.update();

        this.pencil = {
            "color": "#000000",//this.color,
            "size": 3,//this.size,
            "stylingW": "round",
            "stylingH": "round"
        };

        //this.stage = new createjs.Stage(canvasid);
        //this.stage.autoClear = true;
        //this.stage.update();
        
        this.touchPos = {
            x: 0,
            y: 0
        };

        this.isMouseDown = false;
        this.currentShape = [];
        
        createjs.Ticker.framerate = 24;
        createjs.Ticker.addEventListener("tick", function () {
            this.update();
        }.bind(this), this);

    },
    methods: {
        toggleDrawmode() {
            //this.isActive = !this.isActive;
            
            this.$store.commit('updatedrawmode', {drawmode: !this.isDrawmode})
            //document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", this.color[this.isActive])
        },
        /*set_pencil (params) {
            $.each(_.keys(params), $.proxy(function (index, param) {
                this.pencil[param] = params[param];
            }, this));
        },*/
        create_events () {
            createjs.Touch.enable(this.stage);
            this.stage.on("stagemousedown", function (evt) {
                if(!this.isDrawmode) return false;
                this.isMouseDown = true;
                var s = new createjs.Shape();
                if ("ontouchstart" in window) {
                    this.oldX = evt.stageX;
                    this.oldY = evt.stageY;
                    this.oldMidX = evt.stageX;
                    this.oldMidY = evt.stageY;
                    this.touchPos = {
                        x: evt.stageX,
                        y: evt.stageY
                    };
                } else {
                    this.oldX = this.stage.mouseX;
                    this.oldY = this.stage.mouseY;
                    this.oldMidX = this.stage.mouseX;
                    this.oldMidY = this.stage.mouseY;
                }
                var g = s.graphics;
                g.setStrokeStyle(this.pencil.size, this.pencil.stylingW, this.pencil.stylingH);
                g.beginStroke(this.pencil.color);
                this.container.addChild(s);
                //this.stage.addChild(s);
                this.currentShape[this.currentShape.length] = s;
            }, this);
            this.stage.on("stagemousemove", function (evt) {
                if(!this.isDrawmode) return false;
                this.touchPos = {
                    x: evt.stageX,
                    y: evt.stageY
                };
            }, this);
            this.stage.on("stagemouseup", function (evt) {
                if(!this.isDrawmode) return false;
                this.isMouseDown = false;
            }, this);
        },
        update () {
            if (this.isMouseDown && this.isDrawmode) {
                if (this.touchPos !== null) {
                    var pt = new createjs.Point(this.touchPos.x, this.touchPos.y);
                } else {
                    var pt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
                }
                var midPoint = new createjs.Point(this.oldX + pt.x >> 1, this.oldY + pt.y >> 1);
                if (typeof this.currentShape[this.currentShape.length - 1] != "undefined") {
                    this.currentShape[this.currentShape.length - 1].graphics.setStrokeStyle(this.pencil.size, this.pencil.stylingW, this.pencil.stylingH);
                    this.currentShape[this.currentShape.length - 1].graphics.moveTo(midPoint.x, midPoint.y);
                    this.currentShape[this.currentShape.length - 1].graphics.curveTo(this.oldX, this.oldY, this.oldMidX, this.oldMidY);
                }
                this.oldX = pt.x;
                this.oldY = pt.y;
        
                this.oldMidX = midPoint.x;
                this.oldMidY = midPoint.y;
                this.updateCanvas();
                this._removed = [];
            }
        },
        updateCanvas() {
            this.stage.update();
            this.$store.commit('updateb64texture', {b64: document.getElementById('canvas2d').toDataURL("image/jpeg")})
        },
        back () {
            console.log('BACK LAST UPDATE');
        },
        clear () {
            console.log('CLEAR ALL DRAWING OBJECTS');
        },
        flat () {
            console.log('FLAT AS BASE64');
        }
    },
    watch: {
        stage(value) {
          if (!this.stageLoaded && typeof(this.stage != "undefined")) {
            this.create_events();
            this.stageLoaded = true;
          }
        }
      }
}
</script>