<template>
  <div class="grid-1">
    <div id="preview">
      <!--input v-on:input="domagic" v-model="cubeh" type="range" min="0.2" max="1" step="0.01">H : {{ cubeh }}
      <br />
      <input v-on:input="domagic" v-model="cubel" type="range" min="0.2" max="1" step="0.01">L : {{ cubel }}
      <br />
      <input v-on:input="domagic" v-model="cubep" type="range" min="0.2" max="1" step="0.01">P : {{ cubep }}
      <br />
      <input v-on:input="domagic" v-model="zoomlevel" type="range" min="1" max="3" step="0.01">Z : {{ zoomlevel }}
      <br />
      <button v-on:click="rotate(-90)">&#9664;</button><button v-on:click="rotate(90)">&#9654;</button-->
    </div>
  </div> 
</template>

<script>

  // Testing purpose only
  //var title = 'TThis is a text message retured from a function of my 3DComponents.';

  export default {
    //name: 'PANEL3D',
    destination:'preview',
    data () {
      return {
          // 3D useful objects
          cube: null,
          scene: new THREE.Scene(),
          fogColor: new THREE.Color(0x0),
          camera: null,
          viewport: null,
          material: new THREE.MeshBasicMaterial(),
          bodyGeometry: null,
          myObject: null,
          renderer: new THREE.WebGLRenderer(),
          zoomlevel: 1,
          controls: null,
          
          // Taille par défaut du cube
          cubeh : 0.6,
          cubel: 0.6,
          cubep: 0.6,
          materialcolor: 0x2194ce,

          // Gestion des rotations du cube
          rotationgenerator: {
            moving: false,
            transitionduration: 1000,
            from: {
              x: 0,
              y: 0,
              z: 0,
              time: Date.now()
            },
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            destination: {
              x: 0,
              y: 0,
              z: 0
            }
          },

          mixers : [],
          clock : new THREE.Clock(),
          texture : new THREE.Texture(),
          fbxIsAnimated : true,
          image : new Image(),
          //texture: null,
          // On ajuste le niveau de zoom
          count: 0
        }
    },
    methods: {
      domagic : function() {
        //this.myObject.scale.set((this.cubel), (this.cubeh), (this.cubep));

        this.myObject.geometry.parameters.width = this.cubel
        this.renderer.render(this.scene, this.camera[0]);

        this.camera.forEach(element => {
          element.zoom = this.zoomlevel;
          element.updateProjectionMatrix();
        });
        
      },
      buildbox : function() {
        
        // Initialisation pour les modèles 3D
        this.container = document.getElementById('preview');
        this.scene.fog = new THREE.Fog(this.fogColor, 0, 4.5);
        this.scene.background = new THREE.Color(0xf4f6f8);

        var viewSize = 2;
        this.viewport = {
          viewSize: viewSize,
          aspectRatio: this.container.offsetWidth / window.innerHeight,
          left: (-(this.container.offsetWidth / window.innerHeight) * viewSize) / 2,
          right: ((this.container.offsetWidth / window.innerHeight) * viewSize) / 2,
          top: viewSize / 2,
          bottom: -viewSize / 2,
          near: -100,
          far: 100
        };
        this.camera = [
          new THREE.OrthographicCamera(this.viewport.left, this.viewport.right, this.viewport.top, this.viewport.bottom, 0.025, 100),
          new THREE.PerspectiveCamera(45, this.viewport.aspectRatio, .5, 100)
        ];

        this.camera.forEach(element => {
          element.position.set(14, 14, 14);
          element.lookAt(1, 1, 1);
        });
        
        
        
        this.materialcolor.color = this.materialcolor
        this.materialcolor.fog = true

        this.bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
        this.myObject = new THREE.Mesh(this.bodyGeometry, this.material);
        
        this.myObject.position.set(0, 0, 0);
        this.myObject.rotation.set( 0, 0, 0 );
        this.myObject.scale.set(this.cubel, this.cubeh, this.cubep);

        this.scene.add(this.myObject);
        //this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.container.offsetWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        
      },
      settexture2 : function() {
        var loader = new THREE.TextureLoader();
        loader.load(
          'static/png/cube.png',

          // onLoad callback
          function ( texture ) {
            // in this example we create the material when the texture is loaded
            this.material = new THREE.MeshBasicMaterial( {
              map: texture
            } );
            this.scene.children.forEach(function(element) {
            if(element.type == "Group") {
              element.children[0].material = this.material;
            }
          }.bind(this));

          }.bind(this),

          // onProgress callback currently not supported
          undefined,

          // onError callback
          function ( err ) {
            console.error( 'An error happened loading texture.' );
          }
        );


        
        //this.texture = new THREE.TextureLoader().load('static/png/cube.png');
        //this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
        this.settexture2()
        
        // Pourchaque enfant de la scene, on cherche le mesh ?
        

      },
      animate() {

        requestAnimationFrame(this.animate);

        // On bouge avec grâce ((méthode quintInOut tween custom))
        if (this.moving) {
          var executionTime = Date.now();
          var midtransition = Date.now() + (this.rotationgenerator.transitionduration /2);
          var endtransition = this.rotationgenerator.from.time + this.rotationgenerator.transitionduration
          var progress = Math.abs((executionTime - this.rotationgenerator.from.time) / (endtransition - this.rotationgenerator.from.time))
          
          if (executionTime <= endtransition) {
            if (executionTime < midtransition) {
              // On est dans la première moitiée
              //progress

            } else if (executionTime > midtransition) {
              // On est dans la seconde moitiée

            }

          } else {
            // On est arrivé à la fin du temps de rotation, on mets à la position finale.
            this.myObject.rotation.y = this.rotationgenerator.destination.y;
            this.moving = false;
          }

          // On tourne si c'est nécessaire
          //if (this.rotationgenerator.position.y > this.rotationgenerator.destination.y) {
          //  this.rotationgenerator.position.y -= 0.01;
          //  this.myObject.rotation.y = this.rotationgenerator.position.y;
          //} else if (this.rotationgenerator.position.y < this.rotationgenerator.destination.y) {
          //  this.rotationgenerator.position.y += 0.01;
          //  this.myObject.rotation.y = this.rotationgenerator.position.y;
          //}

          
        }
        this.renderer.render(this.scene, this.camera[(this.count)%(this.camera.length)]);
        // On regarde de combien il faut bouger 
      
        
      },


      settexture : function() {
        
        this.image.src = this.$store.state.b64texture;
        this.texture.image = this.image;
        this.image.onload = function() {
          
          this.texture.needsUpdate = true;
          this.material = new THREE.MeshBasicMaterial({map: this.texture});
          this.scene.children.forEach(function(element) {
            if(element.type == "Group") {
              element.children[0].material = this.material;
              element.updateMatrix();
            }
          }.bind(this))          
        }.bind(this);
      },
      
      importbox : function() {
        
        // Initialisation pour les modèles 3D
        this.container = document.getElementById('preview');
        var viewSize = 2;

        this.viewport = {
          viewSize: viewSize,
          aspectRatio: this.container.offsetWidth / window.innerHeight,
          left: (-(this.container.offsetWidth / window.innerHeight) * viewSize) / 2,
          right: ((this.container.offsetWidth / window.innerHeight) * viewSize) / 2,
          top: viewSize / 2,
          bottom: -viewSize / 2,
          near: -100,
          far: 100
        };
        
        this.camera = [
            new THREE.PerspectiveCamera( 45, this.viewport.aspectRatio, 1, 2000 )
        ];

        this.camera.forEach(element => {
          element.position.set( 300, 400, 300 );
          element.lookAt(150, 150, 150);
				
        });
        
        this.controls = new THREE.OrbitControls( this.camera[0],  document.getElementById('preview'));
				this.controls.target.set( 0, 100, 0 );
				this.controls.update();

        this.scene.background = new THREE.Color( 0xffbeb9 );
        //this.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
        
        var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				light.position.set( 0, 200, 0 );
				//this.scene.add( light );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = - 100;
				light.shadow.camera.left = - 120;
				light.shadow.camera.right = 120;
				//this.scene.add( light );
        
        // ground
				var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				//this.scene.add( mesh );

				var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
        //this.scene.add( grid );
        

        //this.material = new THREE.MeshBasicMaterial({ color: this.materialcolor, fog: true });
        
        var loader = new THREE.FBXLoader();
				loader.load( 'static/fbx/cube.animated.fbx', function ( object ) {

          object.mixer = new THREE.AnimationMixer( object );
          this.mixers.push( object.mixer );
          
          // Si il y a de l'animation dans le FBX
          if (this.fbxIsAnimated) {
            var action = object.mixer.clipAction( object.animations[ 0 ] );
            action.play();
          } else {
            //console.info("FBX is not animated")
          }

          object.traverse( function ( child ) {
            if ( child.isMesh ) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          this.scene.add(object);
          this.settexture();

        }.bind(this) );
        
        this.renderer.antialias = true;
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(this.container.offsetWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;

        this.container.appendChild(this.renderer.domElement);

        this.animateimport();
      },
      
      // L'animation
      rotate : function(howmanydegrees) {
        this.rotationgenerator.from.time = Date.now();
        this.rotationgenerator.from.y = this.rotationgenerator.position.y;
        this.rotationgenerator.destination.y += Math.PI * (howmanydegrees) / 180;
        this.moving = true;
        
      },
      resize() {
        this.viewport.aspectRatio = this.container.offsetWidth / window.innerHeight
        this.renderer.setSize(this.container.offsetWidth, window.innerHeight);
        this.camera.forEach(element => {
          element.aspect = this.viewport.aspectRatio;
          element.updateProjectionMatrix();
        });
      },
      renderview() {
        this.renderer.render( this.scene, this.camera[0]);
      },
      animateimport() {
        
        // On rappelle la fonction à chaque itération
        requestAnimationFrame(this.animateimport);
        
        // On joue l'animation du FBX si il existe
        if (this.fbxIsAnimated) {
          if (this.mixers.length > 0 ) {
				  	for ( var i = 0; i < this.mixers.length; i ++ ) {
				  		this.mixers[ i ].update( this.clock.getDelta() );
				  	}
				  }
        } else {
          // On peut fire tourner pour animer un peu...

        }

        this.renderer.render( this.scene, this.camera[0]);

      }
    },
    
    // Se lance quand l'objet est prêt
    mounted(){

        if ( WEBGL.isWebGLAvailable() === false ) {
          document.body.appendChild( WEBGL.getWebGLErrorMessage() );
        }

        // On importe un modèle 3D
        this.importbox();
        
        // Et on l'anime (le rafraichissement est géré dans la fonction avec requestAnimationFrame)
        this.animateimport();
        
        // On demande le rendu
        this.renderview();

        // On mets en place l'écouteur du resize
        window.addEventListener('resize', this.resize(), false);
      }, 
      computed : {
        getb64texture() {
          return this.$store.state.b64texture
        }
      },
      watch : {
        getb64texture(value) {
          this.image.src = value;
          //this.texture.image = this.image;
          //this.texture.needsUpdate = true;
          //this.material.map = this.texture;
          this.renderer.render( this.scene, this.camera[0]);
        }
      }
 }
</script>