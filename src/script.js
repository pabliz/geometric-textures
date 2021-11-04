import "./style.css";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import a from './a.jpg'
import b from './b.jpg'
import c from './c.jpg'
import d from './d.jpg'
import e from './e.jpg'
import f from './f.jpg'

const canvas = document.querySelector("canvas.webgl")

let aa = document.getElementById('aa');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1.6, 1, 1.6);
const loader = new THREE.TextureLoader();
const cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: loader.load(a), transparent: true, side: THREE.DoubleSide }), //right side
    new THREE.MeshBasicMaterial({ map: loader.load(d), transparent: true, side: THREE.DoubleSide }), //left side
    new THREE.MeshBasicMaterial({ map: loader.load(c), transparent: true, side: THREE.DoubleSide }), //top side
    new THREE.MeshBasicMaterial({ map: loader.load(b), transparent: true, side: THREE.DoubleSide }), //bottom side
    new THREE.MeshBasicMaterial({ map: loader.load(e), transparent: true, side: THREE.DoubleSide }), //front side
    new THREE.MeshBasicMaterial({ map: loader.load(f), transparent: true, side: THREE.DoubleSide }), //back side
];

const mesh = new THREE.Mesh(geometry, cubeMaterials);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Resize
window.addEventListener('resize', () => {
    // Update canvas sizes
    width: window.innerWidth
    height: window.innerHeight
        // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2.2;
scene.add(camera);

// Controls
const controls = new TrackballControls(camera, canvas)
controls.enableDamping = true
    // change controls target
controls.target.x = 0.8
controls.update()
    //

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Clock
const clock = new THREE.Clock()


// Animations
const tick = () => {
    // Clock
    const elapsedTime = clock.getElapsedTime()
        // Controls Update (damping)
    controls.update()
        // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick()