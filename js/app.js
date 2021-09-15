const scene = new THREE.Scene();

// Camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1, 2);
camera.lookAt(0, 0, 0);

// Canvas

const canvas = document.querySelector(".webgl");

// Renderer

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls

// const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Resize

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Texture loader

const loader = new THREE.TextureLoader();

const texture = loader.load("../texture/texture.jpg");
const displacement = loader.load("../texture/height.png");
const alpha = loader.load("../texture/alpha.png");

// Geometry

const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({
  color: 0xce0909,
  map: texture,
  displacementMap: displacement,
  displacementScale: 0.3,
  alphaMap: alpha,
  transparent: true,
  dephTest: false,
});

// Mesh

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI * -0.5;
scene.add(plane);

// Lights

const pointLight = new THREE.PointLight(0xce0909, 1);
pointLight.position.set(0.2, 10, 4.4);
scene.add(pointLight);

// Animate

let mouseY = 0;

document.addEventListener("mousemove", displacementScaleOnMouseY);

function displacementScaleOnMouseY(e) {
  mouseY = -e.clientY;
}

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  plane.rotation.z = elapsedTime * 0.1;

  material.displacementScale = 0.3 + mouseY * 0.0001;

  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
};

animate();
