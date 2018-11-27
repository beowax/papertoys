window.onload = function(e){ 

    var container = document.getElementById('preview');
    
    var scene = new THREE.Scene();
    fogColor = new THREE.Color(0x0);
    scene.fog = new THREE.Fog(fogColor, 0.0025, 5);
    scene.background = new THREE.Color(0xffffff);

    //var camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / window.innerHeight, 0.025, 20 );
    var w = container.offsetWidth;
    var h = window.innerHeight;
    var viewSize = 3;
    var aspectRatio = w / h;

    _viewport = {
        viewSize: viewSize,
        aspectRatio: aspectRatio,
        left: (-aspectRatio * viewSize) / 2,
        right: (aspectRatio * viewSize) / 2,
        top: viewSize / 2,
        bottom: -viewSize / 2,
        near: -100,
        far: 100
    }

    
    var camera = new THREE.OrthographicCamera(_viewport.left, _viewport.right, _viewport.top, _viewport.bottom, 0.025, 20);

    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // La matière des objets
    var material = new THREE.MeshBasicMaterial( {
        color: 0x2194ce,
        fog: true
    });

    // La "boite" principale
    var bodyGeometry = new THREE.BoxGeometry(1, 1, 1 );
    var object = new THREE.Mesh(bodyGeometry, material);
    object.position.set(0, 0, 0);
    object.rotation.set( 0, 0, 0 );
    object.scale.set( 1, 1, 1 );

    // Les oreilles

    // Les pieds
    var footPts = [];
    footPts.push( new THREE.Vector2(0,0));
    footPts.push( new THREE.Vector2(0.1,0));
	footPts.push( new THREE.Vector2(0.1,-0.1));
	footPts.push( new THREE.Vector2(0,-0.1));
    footPts.push( new THREE.Vector2(0,0));
    var footShape = new THREE.Shape(footPts);
    
    // On positionne un pied
    var footGeometry = new THREE.ShapeBufferGeometry( footShape );
    var mesh = new THREE.Mesh( footGeometry, new THREE.MeshPhongMaterial( { color: 0x0, side: THREE.DoubleSide } ) );
    mesh.position.set(0, -0.1, 0);
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( 1, 1, 1 );
                    


    

    
    // On ajoute à la scène
    scene.add(object);
    scene.add(mesh);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    function animate() {
        requestAnimationFrame( animate );
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        object.rotation.z += 0.01;
        renderer.render( scene, camera );
    }
    animate();
    
}