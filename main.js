import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import ThreeDModule from '/public/machine3d/scene.gltf'

const socialButton = document.getElementById("socials")


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const canvas = document.getElementById("webgl")

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize( window.innerWidth , window.innerHeight );
renderer.shadowMap.enabled = true; // enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );


//GROUND
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10,10,10),
  new THREE.MeshStandardMaterial({color: 0xffc0cb, metalness: 0.2, roughness: 0.8})
)
ground.rotation.x = -Math.PI / 2
ground.position.y = -0.9;
ground.receiveShadow = true;

scene.add( ground );




camera.position.z = 4;
camera.position.y = 1;
if (window.innerWidth < 500 ) {
  camera.position.z = 4;
  camera.position.y = .6;
}
//camera.position.x = -3




// Load 3D Model
const loader = new GLTFLoader();

loader.load( ThreeDModule, function ( gltf ) {

  //LIGHT
  const light = new THREE.DirectionalLight(0xffffff, 1.9);
  light.position.set(10, 10, 10);
  light.target.position.set(0, 0, 0);
  light.castShadow = true; // enable shadow casting
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;
  scene.add(light);

  //3D Model One
  const objectGltf = gltf.scene
  objectGltf.rotation.y =  4.7

// enable shadow casting and receiving on all meshes in the object
  objectGltf.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

	scene.add( objectGltf );
  objectGltf.position.set(0, -1, 0)
  

  function animate() {
    requestAnimationFrame( animate );
   // objectGltf.rotation.y += 0.01
   if (window.innerWidth < 860 ) {
    objectGltf.rotation.y += 0.01
   
  }
    renderer.render( scene, camera );
  }
  animate();

  // listen for the mousemove event
  document.addEventListener('mousemove', (event) => {
    if (window.innerWidth > 860)
      objectGltf.rotation.y =  4.65 + 0.1* event.clientX / 600
  });



}, undefined, function ( error ) {
	console.error( error );

} );





socialButton.addEventListener("click", () => {
  window.location.href = "https://www.instagram.com/alittlebitofeverything.stg/?hl=en"
})
