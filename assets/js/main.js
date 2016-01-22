// Code for everything!

// dat GUI
var controls = new function() {
	this.rotationSpeed = 0.02;
	this.bouncingSpeed = 0.03;
}

var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'bouncingSpeed', 0, 0.5);

// Setup stats
function initStats() {
	var stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementById("Stats-output")
		.appendChild(stats.domElement);
		return stats;
}

var scene,
	camera,
	renderer;

// Init function
function init() {
	// STATS
	var stats = initStats();

	// Setup the scene and camera variables
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 1000);

	// Basic setup
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	// Setup axes guides
	var axes = new THREE.AxisHelper(20);
	scene.add(axes);

	// Create a plane
	var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1); // Width of 60, height of 20
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	// Positon the plane how we want it
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;
	plane.receiveShadow = true;
	// ADD THE PLANE
	scene.add(plane);

	// Create a cube!
	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	// Position the cube
	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;
	cube.castShadow = true;
	// ADD THE CUBE!
	scene.add(cube);

	// Create a sphere!
	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	// Position the sphere!
	sphere.position.x = 20;
	sphere.position.y = 4;
	sphere.position.z = 2;
	sphere.castShadow = true;
	// ADD THE SPHERE!!!
	scene.add(sphere);

	// Position dat camera
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);

	// Add some lighting
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);

	// Connect the renderer to the render element
	document.getElementById("WebGL-output")
		.appendChild(renderer.domElement);
	renderScene();

	var step = 0;
	function renderScene() {
		stats.update();

		// Animate the cube
		cube.rotation.x += controls.rotationSpeed;
		cube.rotation.y += controls.rotationSpeed;
		cube.rotation.z += controls.rotationSpeed;

		// Bounce the ball
		step += controls.bouncingSpeed;
		sphere.position.x = 20 + (10 * Math.cos(step));
		sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	};

};

window.onload = init;

// Resize the thing when the thing resizes
function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);