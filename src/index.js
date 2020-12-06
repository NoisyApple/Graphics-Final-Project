import Polyhedron from "./Polyhedron";
import { tetrahedronShape, octahedronShape, icosahedronShape } from "./Shapes";
import "./style.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Vector2,
  ReinhardToneMapping,
  PointLight,
} from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import upSvg from "./assets/up.svg";
import downSvg from "./assets/down.svg";
import centralFaceFalse from "./assets/central-face-false.svg";
import centralFaceTrue from "./assets/central-face-true.svg";
import bloomOn from "./assets/bloom-on.svg";
import bloomOff from "./assets/bloom-off.svg";

let btnMorphUp = document.querySelector("#btnMorphUp");
let btnMorphDown = document.querySelector("#btnMorphDown");
let btnShape = document.querySelector("#btnShape");
let btnCentralFace = document.querySelector("#btnCentralFace");
let btnBloom = document.querySelector("#btnBloom");

let shapes = [tetrahedronShape, octahedronShape, icosahedronShape];
let shapeIndex = 0;

let bloomEnabled = false;

applySVG(btnMorphUp, upSvg);
applySVG(btnMorphDown, downSvg);
applySVG(btnCentralFace, centralFaceFalse);
applySVG(btnBloom, bloomOff);

const getControls = () => import("three/examples/jsm/controls/OrbitControls");

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const params = {
  exposure: 2,
  bloomStrength: 0.5,
  bloomThreshold: 0,
  bloomRadius: 0,
};

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = ReinhardToneMapping;
// renderer.setClearColor(0xffffff);

document.querySelector("#canvas").appendChild(renderer.domElement);

let polyhedron = new Polyhedron(shapes[shapeIndex]());

scene.add(new AmbientLight());
scene.add(polyhedron.mesh);

camera.position.z = 5;

getControls().then(({ OrbitControls }) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
});

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

let composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

function animate() {
  requestAnimationFrame(animate);

  polyhedron.mesh.rotation.x += 0.01;
  polyhedron.mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
  if (bloomEnabled) composer.render();
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

btnMorphUp.addEventListener("click", () => polyhedron.forwardMorph());
btnMorphDown.addEventListener("click", () => polyhedron.backwardMorph());
btnShape.addEventListener("click", (e) => {
  shapeIndex = shapeIndex < shapes.length - 1 ? shapeIndex + 1 : 0;
  polyhedron.applyShape(shapes[shapeIndex]());
  e.target.textContent = shapes[shapeIndex]().faces.length;
});
btnCentralFace.addEventListener("click", (e) => {
  polyhedron.useCentralFace(!polyhedron.centralFace);

  btnCentralFace.querySelector("img").src = polyhedron.centralFace
    ? centralFaceTrue
    : centralFaceFalse;
});
btnBloom.addEventListener("click", () => {
  bloomEnabled = !bloomEnabled;

  btnBloom.querySelector("img").src = bloomEnabled ? bloomOn : bloomOff;
});

function applySVG(button, svg) {
  let imgTag = document.createElement("img");
  imgTag.src = svg;
  button.innerHTML = "";
  button.appendChild(imgTag);
}
