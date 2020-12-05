import Polyhedron from "./Polyhedron";
import { tetrahedronShape, octahedronShape, icosahedronShape } from "./Shapes";
import "./style.scss";
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight } from "three";

const getControls = () => import("three/examples/jsm/controls/OrbitControls");

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// const polyhedron = new Polyhedron(tetrahedronShape());
const polyhedron = new Polyhedron(icosahedronShape());

scene.add(new AmbientLight());
scene.add(polyhedron.mesh);

// polyhedron.forwardMorph();
// polyhedron.forwardMorph();
// polyhedron.forwardMorph();
camera.position.z = 5;

getControls().then(({ OrbitControls }) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
});

function animate() {
  requestAnimationFrame(animate);

  polyhedron.mesh.rotation.x += 0.01;
  polyhedron.mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
