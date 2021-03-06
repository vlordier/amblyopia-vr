



// BKL load fonts and preload master letter and 

//    var abc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//	var rand = Math.floor(Math.random() * (abc.length-1));
//	var AB =  rand_letter();
	
/*     var abc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";p
	var rand = Math.floor(Math.random() * (abc.length-1));
	var AB =  abc.charAt(rand); */	
	var AB =  rand_letter();
	var loader = new THREE.FontLoader();
	loader.load('fonts/helvetiker_bold.typeface.json', function ( font ) {
		key_letter = rand_letter();
		var textGeo = new THREE.TextGeometry(key_letter, {
			font: font,
			size: 90, // font size
			height: 20, // how much extrusion (how thick / deep are the letters)
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: 1,
			bevelEnabled: false
		});
		textGeo.computeBoundingBox();
		var textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff } );
		Tetris.text1 = new THREE.Mesh( textGeo, textMaterial );
		// find middle of font
		var middle = new THREE.Vector3();

		middle.x = (textGeo.boundingBox.max.x + textGeo.boundingBox.min.x) / 2;
		middle.y = (textGeo.boundingBox.max.y + textGeo.boundingBox.min.y) / 2;
		middle.z = (textGeo.boundingBox.max.z + textGeo.boundingBox.min.z) / 2;
		
		Tetris.text1.position.x = -middle.x;
		Tetris.text1.position.y = -middle.y;
		Tetris.text1.position.z = 550;
		Tetris.text1.castShadow = false;
		Tetris.text1.receiveShadow = false;
		Tetris.text1.layers.set(2);	
	});


/*  	var loader2 = new THREE.FontLoader();
	loader2.load('fonts/helvetiker_bold.typeface.json', function ( font ) {

		var textGeo = new THREE.TextGeometry(rand_letter(), {
			font: font,
			size: 45, // font size
			height: 20, // how much extrusion (how thick / deep are the letters)
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: 1,
			bevelEnabled: false
		});
		textGeo.computeBoundingBox();
		var textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff } );
		Tetris.text2 = new THREE.Mesh( textGeo, textMaterial );
		// find middle of font
		var middle = new THREE.Vector3();

		middle.x = (textGeo.boundingBox.max.x + textGeo.boundingBox.min.x) / 2;
		middle.y = (textGeo.boundingBox.max.y + textGeo.boundingBox.min.y) / 2;
		middle.z = (textGeo.boundingBox.max.z + textGeo.boundingBox.min.z) / 2;
		
 		Tetris.text2.position.x = -middle.x;
		Tetris.text2.position.y = -middle.y;
		Tetris.text2.position.z = 550;
		Tetris.text2.castShadow = false;
		Tetris.text2.receiveShadow = false;
		Tetris.text2.layers.set(1);	 
	});	  */
	
	
function refresh_letter() {	
	var loader2 = new THREE.FontLoader();
	loader2.load('fonts/helvetiker_bold.typeface.json', function ( font ) {

		var textGeo = new THREE.TextGeometry(rand_letter(), {
			font: font,
			size: 45, // font size
			height: 20, // how much extrusion (how thick / deep are the letters)
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: 1,
			bevelEnabled: false
		});
		textGeo.computeBoundingBox();
		var textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff } );
		Tetris.text2 = new THREE.Mesh( textGeo, textMaterial );
		// find middle of font
		var middle = new THREE.Vector3();

		middle.x = (textGeo.boundingBox.max.x + textGeo.boundingBox.min.x) / 2;
		middle.y = (textGeo.boundingBox.max.y + textGeo.boundingBox.min.y) / 2;
		middle.z = (textGeo.boundingBox.max.z + textGeo.boundingBox.min.z) / 2;
		
 		Tetris.text2.position.x = -middle.x;
		Tetris.text2.position.y = -middle.y;
		Tetris.text2.position.z = 550;
		Tetris.text2.castShadow = false;
		Tetris.text2.receiveShadow = false;
		Tetris.text2.layers.set(1);	 
	});	

}

	
Tetris.init = function () {
    Tetris.sounds["theme"] = document.getElementById("audio_theme");  
    Tetris.sounds["collision"] = document.getElementById("audio_collision");  
    Tetris.sounds["move"] = document.getElementById("audio_move");  
    Tetris.sounds["gameover"] = document.getElementById("audio_gameover");  
    Tetris.sounds["score"] = document.getElementById("audio_score");  

    Tetris.sounds["theme"].play();
    // set the scene size
	
	// BKL create inital random letter
	refresh_letter();

    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    // set some camera attributes
    var VIEW_ANGLE = 50,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 20.1,
        FAR = 2000;

    // create a WebGL renderer, camera
    // and a scene
    Tetris.renderer = new THREE.WebGLRenderer({antialias: true});
	Tetris.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    Tetris.camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);
//	Tetris.camera.zoom = 1;	
    Tetris.scene = new THREE.Scene();

    // the camera starts at 0,0,0 so pull it back
    Tetris.camera.position.z = 1150;
	Tetris.camera.position.y = 0;
    Tetris.scene.add(Tetris.camera);

    // start the renderer
    Tetris.renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    document.body.appendChild(Tetris.renderer.domElement);
		
    // configuration object
    var boundingBoxConfig = {
        width:1440,
        height:720,
        depth:1200,
        splitX:6,
        splitY:6,
        splitZ:20
    };
    Tetris.boundingBoxConfig = boundingBoxConfig;
    Tetris.blockSize = boundingBoxConfig.width / boundingBoxConfig.splitX;

    Tetris.Board.init(boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);
	//BKL adding texture to bounding box
    var texture1 = THREE.ImageUtils.loadTexture( 'img/bricks.jpg' );
    var texture2 = THREE.ImageUtils.loadTexture( 'img/stars.jpg' );
//		texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
//	    texture2.repeat.set( 6, 6 );
	var material = new THREE.MeshLambertMaterial({ map: texture2, side: THREE.BackSide, opacity: 0.8, transparent: true });
	
//	var material = new THREE.MeshPhongMaterial({ map: THREE.TextureLoader('img/crate'), side: THREE.BackSide, opacity: 0.75, transparent: true, wireframe: false });
 //     var material = new THREE.MeshBasicMaterial({color:0xffaa00, wireframe:true, side: THREE.DoubleSide, transparent:true});
  /*
    var boundingBox = new THREE.Mesh(
        new THREE.CubeGeometry(boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth, boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ),
        new THREE.MeshBasicMaterial({color:0xffaa00, wireframe:true, side: THREE.DoubleSide, transparent:true})
    );
 */
 	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, vertexColors: THREE.VertexColors, side: THREE.BackSide, opacity: 0.90, transparent: true } );
	var color, face, numberOfSides, vertexIndex;
	// faces are indexed using characters
	var faceIndices = [ 'a', 'b', 'c', 'd' ];
	// randomly color cube
	var cubeGeometry = new THREE.CubeGeometry(boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth, boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);
	for ( var i = 0; i < cubeGeometry.faces.length; i++ ) 
	{
		face  = cubeGeometry.faces[ i ];	
		// determine if current face is a tri or a quad
		numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
		// assign color to each vertex of current face
		for( var j = 0; j < numberOfSides; j++ ) 
		{
			vertexIndex = face[ faceIndices[ j ] ];
			// initialize color variable
			color = new THREE.Color( 0xffffff );
			if((j%2)==0){
			color.setHex( 0x264942 );}
				//color.setHex( Math.random() * 0xff0000 );}	   
			else{
				color.setHex( 0x56bca6 );}
			
			face.vertexColors[ j ] = color;
		}
	}
	
    var boundingBox = new THREE.Mesh( cubeGeometry, material);
// BKL controling color of the bounding box when not using texture.
//	boundingBox.setColor = function(color){
//		boundingBox.material.color = new THREE.Color(color);
//		}
//	boundingBox.setColor(0xFFFFFF)  //change color using hex value or
//	boundingBox.setColor("blue")    //set material color by using color name

    Tetris.scene.add(boundingBox);
//  Adding Light
	var light = new THREE.AmbientLight( 0x404040 );
	Tetris.scene.add( light );
	var light2 = new THREE.PointLight( 0xffffff, 1, 100 );
	light2.intensity = 1;
	Tetris.scene.add( light2 );
	var light3 = new THREE.DirectionalLight( 0xffffff );
	light3.position.set( -1, -6, 10 ).normalize();
	Tetris.scene.add(light3);
	
//    Tetris.renderer.render(Tetris.scene, Tetris.camera);

    Tetris.stats = new Stats();
    Tetris.stats.domElement.style.position = 'absolute';
    Tetris.stats.domElement.style.top = '10px';
    Tetris.stats.domElement.style.left = '10px';
// BKL Use to disable stat window 	
//    document.body.appendChild(Tetris.stats.domElement);

    document.getElementById("play_button").addEventListener('click', function (event) {
        event.preventDefault();
        Tetris.start();
    });
};

Tetris.start = function () {
    document.getElementById("menu").style.display = "none";
    Tetris.pointsDOM = document.getElementById("points");
    Tetris.pointsDOM.style.display = "block";
	
    Tetris.sounds["theme"].pause();
	
    //Tetris.Block.generate();
	//BKL test block
	var geometry2 = new THREE.BoxGeometry(200,200,200);

//	var material2 = new THREE.MeshLambertMaterial();
//	var loader = new THREE.TextureLoader();
//	var texture1 = loader.load('img/bricks.jpg');
//	var texture2 = loader.load('img/crate.jpg');

	var texture1 = THREE.ImageUtils.loadTexture( 'img/bricks.jpg' );
    var texture2 = THREE.ImageUtils.loadTexture( 'img/crate.jpg' );
	var material1 = new THREE.MeshLambertMaterial({ map: texture1});
	var material2 = new THREE.MeshLambertMaterial({ map: texture2});
	var material3 = new THREE.MeshLambertMaterial({ color: 0x0000ff, wireframe: false});
	var material4 = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: false});
	var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.BackSide } );
	
	Tetris.cube1 = new THREE.Mesh(geometry2, material3);
	Tetris.cubeoutline1 = new THREE.Mesh(geometry2, outlineMaterial1);
	Tetris.cube2 = new THREE.Mesh(geometry2, material4);
	Tetris.cubeoutline2 = new THREE.Mesh(geometry2, outlineMaterial1);
//	var fit = new THREE.Object3D(); 
	// Position cube mesh

	Tetris.cube1.position.z = 200;
	Tetris.cube1.position.x = 0;
	Tetris.cube1.position.y = 0;
	Tetris.cube1.layers.set(1);
	
	Tetris.cubeoutline1.position = Tetris.cube1.position;
	Tetris.cubeoutline1.scale.multiplyScalar(1.02);
	
	Tetris.cube2.position.z = 200;
	Tetris.cube2.position.x = 0;
	Tetris.cube2.position.y = 0;
	Tetris.cube2.layers.set(2);
	Tetris.cubeoutline2.position = Tetris.cube2.position;
	Tetris.cubeoutline2.scale.multiplyScalar(1.02);
//	Tetris.scene.add(Tetris.cube1);
//	Tetris.scene.add(Tetris.cubeoutline1);
	Tetris.scene.add(Tetris.cube2);
//	Tetris.scene.add(Tetris.cubeoutline2); 
    //// add text to cube of TextGeometry
	Tetris.scene.add(Tetris.text1);
	Tetris.scene.add(Tetris.text2);
	Tetris.text2.visible = true;

// End TextGeometry
	//BKL 
	// Apply VR stereo rendering to renderer.
	Tetris.effect = new THREE.VREffect(Tetris.renderer);
	Tetris.effect.setSize(window.innerWidth, window.innerHeight);
	
	// Get the VRDisplay and save it for later.
	Tetris.vrDisplay = null;
	navigator.getVRDisplays().then(function(displays) {
	  if (displays.length > 0) {
		Tetris.vrDisplay = displays[0];

		// Kick off the render loop.
		Tetris.vrDisplay.requestAnimationFrame(Tetris.animate);
	  }
	  
	  
	});
	
};


Tetris.gameStepTime = 100;

Tetris.frameTime = 0; // ms
Tetris.cumulatedFrameTime = 0; // ms
Tetris._lastFrameTime = Date.now(); // timestamp

Tetris.gameOver = false;

Tetris.animate = function () {
    var time = Date.now();
    Tetris.frameTime = time - Tetris._lastFrameTime;
    Tetris._lastFrameTime = time;
    Tetris.cumulatedFrameTime += Tetris.frameTime;
// adding progressive effect for new blocks 	
/*
	if (CurrentBlockOpacity <1){
		 CurrentBlockOpacity = CurrentBlockOpacity+0.005;
			if (CurrentBlockOpacity > 0.3){
			    CurrentBlockOpacity = 1;
				CurrentBlockWireFrame = true;
				Tetris.Block.mesh.children["0"].material.wireframe = true;
			}	
		Tetris.Block.mesh.children["0"].material.opacity = CurrentBlockOpacity;
		Tetris.Block.mesh.children["1"].material.opacity = CurrentBlockOpacity;
	}
*/	
//		Tetris.Block.mesh.children["0"].material.opacity = CurrentBlockOpacity;
//		Tetris.Block.mesh.children["1"].material.opacity = CurrentBlockOpacity;

    while (Tetris.cumulatedFrameTime > Tetris.gameStepTime) {
        Tetris.cumulatedFrameTime -= Tetris.gameStepTime;

    switch (level) {
        //case
		// BKL changed from arrows to use BT keyboard with phone
        case 1: //move
			Tetris.text1.visible = false;
//			Tetris.scene.remove(Tetris.text1);
			Tetris.cube1.layers.set(0);
			Tetris.cube2.layers.set(VR_layers);
			if (Tetris.cube1.position.x < 140){
			Tetris.text1.position.x = Tetris.text1.position.x +3;
//			Tetris.text2[0].position.x = Tetris.text2[0].position.x -3;
			Tetris.cube1.position.x = Tetris.cube1.position.x +4;
			Tetris.cube2.position.x = Tetris.cube2.position.x -4;
			Tetris.cube1.position.z = Tetris.cube1.position.z -3;
			Tetris.cube2.position.z = Tetris.cube2.position.z -3;
			Tetris.text1.position.z = Tetris.text1.position.z -3;
//			Tetris.text2[0].position.z = Tetris.text2[0].position.z -3;
			} 
			else {
				Tetris.cube1.rotation.y += Tetris.frameTime * .0006;
				Tetris.cube1.rotation.x += Tetris.frameTime * .0006;
				Tetris.cube2.rotation.y += -Tetris.frameTime * .0006;
				Tetris.cube2.rotation.x += -Tetris.frameTime * .0006;
			}
			
            break;
		case 2: //freeze and show letter
			Tetris.text1.visible = true;
//			Tetris.text2[0].layers.set(VR_layers);
			Tetris.cube2.layers.set(VR_layers);
//			Tetris.text2[0].visible = true;
			Tetris.cube1.rotation.y = 0;
			Tetris.cube1.rotation.x = 0;
			Tetris.cube1.rotation.z = 0;
			Tetris.cube2.rotation.y = 0;
			Tetris.cube2.rotation.x = 0;
			Tetris.cube2.rotation.z = 0;
			refresh_letter();
			Tetris.text1.needsUpdate = true;
//			Tetris.scene.add(Tetris.text1);
						
            break;	
		case 3: //start game
//			Tetris.text2[0].layers.set(VR_layers);
			Tetris.cube2.layers.set(VR_layers);
						
			
			Tetris.text1.needsUpdate = true;			
            break;	
		case 4: //start game
//			Tetris.text2[0].layers.set(VR_layers);
			Tetris.cube2.layers.set(VR_layers);
			refresh_letter();
						
            break;	
		
	}			

//        Tetris.Block.move(0, 0, -0.5);
//		Tetris.Block.rotate(1, 1, 1);
//	Tetris.scene.remove(Tetris.text2[0]);
//  Tetris.scene.remove(Tetris.cube1);
//	Tetris.scene.remove(Tetris.text2[0]);
//	refresh_letter();
//	Tetris.scene.add(Tetris.cube1);
//	Tetris.scene.add(Tetris.text2[0]);
//	Tetris.text2.position.z = Tetris.text2.position.z +5;
//	Tetris.effect.render(scene, camera);
//	Tetris.cube1.rotation.y += Tetris.frameTime * .0006;
//	Tetris.cube1.rotation.x += Tetris.frameTime * .0006;


		
    }
	
//	Tetris.stats.update();
	 
//	Tetris.Block.mesh.layers.set(1);
//    Tetris.renderer.render(Tetris.scene, Tetris.camera);
	// BKL Render the VR scene.
//	Tetris.camera.updateProjectionMatrix();
	Tetris.effect.render(Tetris.scene, Tetris.camera);
   
	// BKL    if (!Tetris.gameOver) window.requestAnimationFrame(Tetris.animate);
	if (!Tetris.gameOver) Tetris.vrDisplay.requestAnimationFrame(Tetris.animate);
};

//BKL  - adding Button click handlers for VR.
document.querySelector('button#fullscreen').addEventListener('click', function() {
  enterFullscreen(Tetris.renderer.domElement);
});

document.querySelector('button#vr').addEventListener('click', function() {
  Tetris.vrDisplay.requestPresent([{source: Tetris.renderer.domElement}]);
});

function enterFullscreen (el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}

function onResize() {
  console.log('Resizing to %s x %s.', window.innerWidth, window.innerHeight);
  Tetris.effect.setSize(window.innerWidth, window.innerHeight);
  Tetris.camera.aspect = window.innerWidth / window.innerHeight;
  Tetris.camera.updateProjectionMatrix();
}

// BKL added to generate randome letters
function rand_letter() {
    var abc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var rand = Math.floor(Math.random() * (abc.length-1));
	return  abc.charAt(rand);
}

function onVRDisplayPresentChange() {
  console.log('onVRDisplayPresentChange');
  onResize();
}

// Resize the WebGL canvas when we resize and also when we change modes.
window.addEventListener('resize', onResize);
window.addEventListener('vrdisplaypresentchange', onVRDisplayPresentChange);



// nice test:
// var i = 0, j = 0, k = 0, interval = setInterval(function() {if(i==6) {i=0;j++;} if(j==6) {j=0;k++;} if(k==6) {clearInterval(interval); return;} Tetris.addStaticBlock(i,j,k); i++;},30)

Tetris.staticBlocks = [];
Tetris.zColors = [
    0x6666ff, 0x66ffff, 0xcc68EE, 0x666633, 0x66ff66, 0x9966ff, 0x00ff66, 0x66EE33, 0x003399, 0x330099, 0xFFA500, 0x99ff00, 0xee1289, 0x71C671, 0x00BFFF, 0x666633, 0x669966, 0x9966ff
];
Tetris.addStaticBlock = function (x, y, z) {
    if (Tetris.staticBlocks[x] === undefined) Tetris.staticBlocks[x] = [];
    if (Tetris.staticBlocks[x][y] === undefined) Tetris.staticBlocks[x][y] = [];

    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry(Tetris.blockSize, Tetris.blockSize, Tetris.blockSize), [
        new THREE.MeshPhongMaterial({color:Tetris.zColors[z], shading:THREE.FlatShading, wireframe:true, transparent:false}),
        new THREE.MeshPhongMaterial({color:Tetris.zColors[z]})
    ]);

    mesh.position.x = (x - Tetris.boundingBoxConfig.splitX / 2) * Tetris.blockSize + Tetris.blockSize / 2;
    mesh.position.y = (y - Tetris.boundingBoxConfig.splitY / 2) * Tetris.blockSize + Tetris.blockSize / 2;
    mesh.position.z = (z - Tetris.boundingBoxConfig.splitZ / 2) * Tetris.blockSize + Tetris.blockSize / 2;

    Tetris.scene.add(mesh);
    Tetris.staticBlocks[x][y][z] = mesh;
};

Tetris.currentPoints = 0;
Tetris.addPoints = function (n) {
    Tetris.currentPoints += n;
    
	Tetris.pointsDOM.innerHTML = Tetris.currentPoints; 
    Cufon.replace('#points');
    Tetris.sounds["score"].play();
};

	


window.addEventListener("load", Tetris.init);

window.addEventListener('keydown', function (event) {
    var key = event.which ? event.which : event.keyCode;

    switch (key) {
        //case
		// BKL changed from arrows to use BT keyboard with phone
        case 73: // up (i)
            Tetris.Block.move(0, 1, 0);
            break;
        case 75: // down (k)
            Tetris.Block.move(0, -1, 0);
            break;
        case 74: // left(j)
            Tetris.Block.move(-1, 0, 0);
            break;
        case 76: // right (l)
            Tetris.Block.move(1, 0, 0);
            break;
        case 32: // space
            //Tetris.Block.moveto(0, 0, -0.5);
//			Tetris.scene.remove(Tetris.text2);
			Tetris.text2.visible = false;
//			Tetris.text2 = null;

            break;

        case 87: // up (w)
		refresh_letter();
//		Tetris.scene.add(Tetris.text2);
		Tetris.text2.visible = true;
//            Tetris.Block.rotate(90, 0, 0);
            break;
        case 83: // down (s)
            Tetris.Block.rotate(-90, 0, 0);
            break;

        case 65: // left(a)
            Tetris.Block.rotate(0, 0, 90);
            break;
        case 68: // right (d)
            Tetris.Block.rotate(0, 0, -90);
            break;

        case 81: // (q)
            Tetris.Block.rotate(0, 90, 0);
            break;
        case 69: // (e)
            Tetris.Block.rotate(0, -90, 0);
            break;
		// BKL adding keyboard commands 	
		case 80: // (p)
            Tetris.start();
            break;	
		case 70: // (f)
			Tetris.vrDisplay.requestPresent([{source: Tetris.renderer.domElement}]);
			enterFullscreen(Tetris.renderer.domElement);
            break;	
		case 86: // (v)
            Tetris.vrDisplay.requestPresent([{source: Tetris.renderer.domElement}]);
			enterFullscreen(Tetris.renderer.domElement);
            break;		
		case 48: // (0)
			VR_layers = 0;
            break;	
		case 49:// (1)
			VR_layers = 1;
			Tetris.sounds["move"].play();
            break;			
		case 50: //2
			VR_layers = 2;
			Tetris.sounds["move"].play();
			Tetris.sounds["move"].play();
            break;		
		case 51: //3
			level = 1;
            break;	
		case 52: //4
			level = 0;
            break;		
		case 13: // enter key
			Tetris.sounds["move"].play();
			level = level + 1;
            break;		 
    }
}, false);	

