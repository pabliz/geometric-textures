import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import a from './a.png'
import b from './b.png'
import c from './c.png'
import d from './d.png'
import e from './e.png'
import f from './f.png'
import gsap from 'gsap';

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

//const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
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

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullScreenElement) {
        if (canvas.requestFullscreen()) {
            canvas.requestFullscreen()
        } else if (!canvas.requestFullscreen()) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen()) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen()) {
            document.webkitExitFullscreen()
        }
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
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