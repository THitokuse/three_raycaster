// 変数の定義
let scene;
let light;
let ambient;
let camera;
let renderer;
let windowSize = onResizeWindow();
let [width, height]= windowSize.split("x")
let controls;

let count = 200;
let size;
let box;

function onResizeWindow() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  return width + "x" + height;
}

function init() {
  // scene ステージ
  scene = new THREE.Scene();

  // light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 30);
  scene.add(light);

  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  // controls
  controls = new THREE.OrbitControls(camera);
  controls.autoRotate = true;

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xefefef);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

  // picking
  for (i = 0; i < count; i++) {
    size = Math.random() * 20 + 10;
    box = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    );
    box.position.set(
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
      Math.random() * 200 - 100
    );
    scene.add(box);
  }

  function render() {
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
  }
  render();
}

window.onload = init;