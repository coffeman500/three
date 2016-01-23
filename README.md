# three
Three JS Playground

# notes:
Scene:
	Object used to store and keep track of all objects we want to render, along with lighting we're gonna use

Naming things
	You can name objects added to scene in order to access them later. ex: object.name = "bleh". In order to access bleh: THREE.Scene.getObjectByName("bleh");

Camera follow:
	You can use camera.lookAt(position) to point the camera at an object.

Cameras:
	Perspective: Objects size depending on where they are from the camera
	Ortho: All objects are the same size regardless of position

