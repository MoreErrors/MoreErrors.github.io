import * as THREE from './build/three.module.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import * as dat from './examples/jsm/libs/dat.gui.module.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';


//Variables for setup

let container;
let camera;
let renderer;
let scene;
let desk;

let cameraXPos;
let cameraYPos;
let cameraZPos;
let cameraXRot;
let cameraYRot;
let cameraZRot;

let ambientColor;
let ambientInt;

let pointlightx;
let pointlighty;
let pointlightz;

let controls;


function init(){
    container = document.querySelector('.scene');

    //Create scene
    scene = new THREE.Scene();

    const fov = 45;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

        
    //Developers tools
    //const gui = new dat.GUI();
    

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //controls = new OrbitControls(camera, renderer.domElement);

        //camera position
    cameraXPos = 3.5;
    cameraYPos = 8.2;
    cameraZPos = 8.4;
    camera.position.set(cameraXPos, cameraYPos, cameraZPos);
    camera.rotation.set(-0.5, 0.3,0);

        //rotation edit

    // gui.add(camera.rotation, 'x').min(-10).max(10);
    // gui.add(camera.rotation, 'y').min(-10).max(10);
    // gui.add(camera.rotation, 'z').min(-10).max(10);

    //  gui.add(camera.position, 'x').min(-10).max(10);
    //  gui.add(camera.position, 'y').min(-10).max(10);
    //  gui.add(camera.position, 'z').min(-10).max(10);

    //Ambient light
    ambientColor = 0xffffff;
    ambientInt = 2.5;
    const ambient = new THREE.AmbientLight(ambientColor, ambientInt);
    scene.add(ambient);

    //light 1
    const pointCol = 0xffffff;
    const pointInt = 5;
    const pointDist = 4;
    const pointDecay = 2;
    const pointLight = new THREE.PointLight(pointCol, pointInt, pointDist, pointDecay);
    
    pointlightx = 2;
    pointlighty = 3;
    pointlightz = 4;
    pointLight.position.set(pointlightx, pointlighty. pointlightz);
    
    scene.add(pointLight)

    //light 2
    const pointLight2 = new THREE.PointLight(0xff00ff, 3)
    pointLight2.position.set(-1.86,1,-1.65)
    pointLight2.intensity = 5
    scene.add(pointLight2)

    //Load model
    let loader = new GLTFLoader();
    loader.load('./3d/desk_painted.gltf', function(gltf){
        desk = gltf.scene;
        scene.add(gltf.scene);
        desk.rotation.set(0, 1, -0.15);
        //gui.add(desk.rotation, 'x').min(-10).max(10);
        //gui.add(desk.rotation, 'y').min(-10).max(10);
        //gui.add(desk.rotation, 'z').min(-10).max(10);
    });



    //display
    animate();
}

//Animation of desk at start
const introStartRot = 0;
const introEndRot = .5;
let introRotPlus = false; //False = rotate back to 0

function animate(){
    requestAnimationFrame(animate);

    introRotPlus ? desk.rotation.y += .0005 : desk.rotation.y -= .0005;
    if(desk.rotation.y < introStartRot) introRotPlus = true;
    if(desk.rotation.y > introEndRot) introRotPlus = false;

    renderer.render(scene,camera); 
}

init();

function onWindowResize(){
    camera.aspect = container.clientWidth/ container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);