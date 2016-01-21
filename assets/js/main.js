// Code for everything!


function init() {
	// Setup the scene and camera variables
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 1000);

	// Basic setup
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex(0xEEEEEE);
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Setup axes guides
	var axes = new THREE.AxisHelper(20);
	scene.add(axes);

	// Create a plane
	var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
	var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	// Positon the plane how we want it
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;

	// Create a cube!
	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	// Position the cube
	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;
	// ADD THE CUBE!
	scene.add(cube);

	// Create a sphere!
	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
	// Position the sphere!
	sphere.position.x = -30;
	sphere.position.y = 4;
	sphere.position.z = 2;
	// ADD THE SPHERE!!!
	scene.add(sphere);

	// Position dat camera
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);

	// Connect the renderer to the render element
	document.getElementById("WebGL-output")
		.appendChild(renderer.domElement);
		renderer.render(scene, camera);
};

window.onload = init;