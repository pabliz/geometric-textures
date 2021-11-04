// SCENE
const scene = new THREE.Scene();

// RED CUBE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); //ADD MESH TO SCENE

// SIZES
const sizes = {
  width: 800,
  height: 600,
};

// CAMERA (POV)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); //fov, aspect ratio, renderer
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera); // ADD CAMERA TO SCENE

// RENDERER
const canvas = document.querySelector(".webgl"); // CANVAS
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
