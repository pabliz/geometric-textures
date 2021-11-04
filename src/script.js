import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const canvas = document.querySelector("canvas.webgl")
const wrapper = document.querySelector(".wrapper")
const fullscreen = document.querySelector(".fullscreen")
let a = document.getElementById('a');
a.play()

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xCACCD2);

// Object
const geometry = new THREE.BoxGeometry(1.6, 1.6, .9);
const textureA = new THREE.VideoTexture(a);

const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: textureA, transparent: true });
material.opacity = 0.35;
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Resize
window.addEventListener('resize', () => {
    // Update canvas sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
        // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
        // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Fullscreen
const handleFullscreen = () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullScreenElement) {
        if (wrapper.requestFullscreen()) {
            wrapper.requestFullscreen()
        } else if (!wrapper.requestFullscreen()) {
            wrapper.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen()) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen()) {
            document.webkitExitFullscreen()
        }
    }
}

window.addEventListener('dblclick', handleFullscreen)
    // Fullscreen button
fullscreen.addEventListener('click', handleFullscreen)



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2.4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
    // change controls target
    // controls.target.x = 0.7
    // controls.update()
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