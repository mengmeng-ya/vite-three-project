import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, cube, camera, renderer;
let axesHelper;
let controls;

init();
render();

function init() {
  /* 1 创建 scene， 以及物体*/
  scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  cube = new THREE.Mesh(geometry, material); // mesh: 物体
  scene.add(cube);

  // 1.1 显示坐标轴
  axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // 2 创建 camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.position.x = 2;
  camera.position.y = 1;

  // 3 创建renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); // canvas

  // 4 控制器
  //OrbitControls 控制的是 camera（eye）
  controls = new OrbitControls(camera, renderer.domElement);
}

function render() {
  renderer.render(scene, camera);
  cube.rotation.y += 0.01;
  requestAnimationFrame(render);
}
