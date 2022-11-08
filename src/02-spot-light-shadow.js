import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let renderer, camera, scene;
let axesHelper;
let ambientLight, spotLight;
let plane, cylinder;
let controls;

initRenderer();
initCamera();
initScene();
initAxesHelper();
initControls();

initAmbientLight();
initSpotLight();

initMeshes();
initShadow();

render();

function initRenderer() {
  renderer = new THREE.WebGL1Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 120, 200);
  camera.lookAt(0, 0, 0);
}

function initScene() {
  scene = new THREE.Scene();
}

function initAxesHelper() {
  axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);
}

function initAmbientLight() {
  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
}

function initSpotLight() {
  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(-50, 80, 0);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.2;
  scene.add(spotLight);
}

function initMeshes() {
  const geometryPlane = new THREE.PlaneGeometry(2000, 2000);
  const materialPlane = new THREE.MeshPhongMaterial({ color: 0x808080 });
  plane = new THREE.Mesh(geometryPlane, materialPlane);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, -10, 0);
  scene.add(plane);

  const geometryCylinder = new THREE.CylinderGeometry(5, 5, 2, 24, 1, false);
  const materialCylinder = new THREE.MeshPhongMaterial({ color: 0x408080 });
  cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
  cylinder.position.set(0, 10, 0);
  scene.add(cylinder);
}

function initControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
}

function initShadow() {
  cylinder.castShadow = true;
  plane.receiveShadow = true;
  spotLight.castShadow = true;
  renderer.shadowMap.enabled = true;
}

function render() {
  renderer.render(scene, camera);
}
