// We gon try some shit.

var bM = {
	"x": 200,
	"y": 400
};

var scene,
	camera,
	renderer;

var p = {
	"fric": .9,
	"acc": 1,
	"velMax": 2,
	"xVel": 0,
	"yVel": 0,
	"zVel": null
};

function init() {
	// Scene and camera
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

	// Basic setup
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	var axes = new THREE.AxisHelper(20);
	scene.add(axes);

	// Setup a plane board, thing.
	var boardGeo = new THREE.PlaneGeometry(bM.x, bM.y, 1, 1);
	var boardMat = new THREE.MeshLambertMaterial({color: 0xffffff});
	var board = new THREE.Mesh(boardGeo, boardMat);
	board.receiveShadow = true;

	scene.add(board);

	// Let's get some walls up in huzuh
	var wallXGeo = new THREE.PlaneGeometry(bM.x, 6, 1, 1);
	var wallXMat = new THREE.MeshLambertMaterial({color: 0xffffff});
	var wallX = new THREE.Mesh(wallXGeo, wallXMat);
	wallX.position.set(0, (bM.y / 2), 3);
	wallX.rotateX(Math.PI * .5);
	wallX.material.side = THREE.DoubleSide;

	wallX2 = wallX.clone();
	wallX2.position.set(0, -(bM.y / 2), 3);

	var wallYGeo = new THREE.PlaneGeometry(6, bM.y, 1, 1);
	var wallYMat = new THREE.MeshLambertMaterial({color: 0xffffff});
	var wallY = new THREE.Mesh(wallYGeo, wallYMat);
	wallY.position.set((bM.x / 2), 0, 3);
	wallY.rotateY(Math.PI * .5);
	wallY.material.side = THREE.DoubleSide;

	wallY2 = wallY.clone();
	wallY2.position.set(-(bM.x / 2), 0, 3);

	scene.add(wallX);
	scene.add(wallX2);
	scene.add(wallY);
	scene.add(wallY2);

	// Add in le ball
	var ballGeo = new THREE.SphereGeometry(5, 20, 20);
	var ballMat = new THREE.MeshLambertMaterial({color:0x00fffff});
	var ball = new THREE.Mesh(ballGeo, ballMat);
	ball.position.z = 5;
	ball.castShadow = true;
	scene.add(ball);

	// get some camera position action goin
	camera.position.x = 0;
	camera.position.y = -250;
	camera.position.z = 150;
	camera.lookAt(ball.position);

	// Need dem lights
    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-125, -250, 100);
	spotLight.castShadow = true;
	scene.add(spotLight);

	// Connect to the renderer
	document.getElementById("WebGL-output")
		.appendChild(renderer.domElement);
	renderScene();

	function renderScene() {
		
		// Do some acceleration
		// Up/Down
		if (Key.isDown(87)) {
			if (Math.abs(p.yVel) <= p.velMax)
				p.yVel += p.acc;
		}
		if (Key.isDown(83)) {
			if (Math.abs(p.yVel) <= p.velMax)
				p.yVel -= p.acc;
		}

		// Left/Right
		if (Key.isDown(68)) {
			if (Math.abs(p.xVel) <= p.velMax)
				p.xVel += p.acc;
		}
		if (Key.isDown(65)) {
			if (Math.abs(p.xVel) <= p.velMax)
				p.xVel -= p.acc;
		}

		// Jump!
		if (Key.isDown(32) && p.zVel == null) {
			p.zVel = 5;
		}

		console.log(p.xVel + " " + p.yVel);
		// Apply movement
		ball.position.x += p.xVel;
		ball.position.y += p.yVel;
		ball.position.z += p.zVel;

		// Apply friction
		// X Axis
		if (Math.abs(p.xVel) < .1) {
			p.xVel = 0;
		}
		else {
			p.xVel *= p.fric;
		}

		// Y Axis
		if (Math.abs(p.yVel) < .1) {
			p.yVel = 0;
		}
		else {
			p.yVel *= p.fric;
		}

		// We all gotta come down sometimes
		if (p.zVel != null) {
			if (ball.position.z > 5) {
				p.zVel -= .5;
			}
			else {
				p.zVel = null;
				ball.position.z = 5;
			}
		}

		// Clear boundaries are very important.
		if (ball.position.x > bM.x / 2 - 5)
			ball.position.x = bM.x / 2 - 5;
		if (ball.position.x < -bM.x / 2 + 5)
			ball.position.x = -bM.x / 2 + 5;
		if (ball.position.y > bM.y / 2 - 5)
			ball.position.y = bM.y / 2 - 5;
		if (ball.position.y < -bM.y / 2 + 5)
			ball.position.y = -bM.y / 2 + 5;

		// Pay our final dues and go again!
		camera.position.set(ball.position.x, ball.position.y - 70, 50);
		camera.lookAt(ball.position);


		spotLight.target = ball;
		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	};

};

window.onload = init;