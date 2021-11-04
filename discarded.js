import * as THREE from './build/three.module.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import * as dat from './examples/jsm/libs/dat.gui.module.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './examples/jsm/loaders/DRACOLoader.js';

//Vars: Canvas
let container, camera, camx, camy, camz, renderer, scene;
//Vars: Tweens
let position, target;
//Vars: model
let MDdesk, MDrotX, MDrotY, MDrotZ;

camx = 4;
camy = 9;
camz = 9.7;

//Generate
function init(){
    //Set canvas
    container = document.querySelector('.scene');   
    scene = new THREE.Scene();
    
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);

    camera.position.set(camx, camy, camz);
    camera.rotation.set(-0.5, 0.3,0);

    //Set light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);    

    const pointLight = new THREE.DirectionalLight(0xFFFFFF, .4);
    pointLight.position.set(20, 100, 10);
    pointLight.castShadow = true;
    scene.add(pointLight)

    //Load models + dracoDecoder
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./examples/js/libs/draco/');

    let loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load('./3d/comprDesk.glb', function(gltf){
        MDdesk = gltf.scene;
        scene.add(MDdesk);
        MDdesk.rotation.set(0, 1, -0.15);
    });

    //Tinker
    // const gui = new dat.GUI();
    // gui.add(camera.position, 'x').min(-10).max(10);
    // gui.add(camera.position, 'y').min(-10).max(10);
    // gui.add(camera.position, 'z').min(-10).max(10);
    
    position = {x: camx, y: camy, z: camz};
    target = {x: 0.48, y: 5.5, z: 4.17};
    var tween1 = new TWEEN.Tween(position).to(target, 1500);

    //Scroll animation - Change animation depending on state
    function updateCamera(ev) {
        if (ScrollAnim == "PosSplash"){          
            tween1.onUpdate(function() {
                camera.position.x = position.x;
                camera.position.y = position.y;
                camera.position.z = position.z;
            });

            if(camera.position.x != target.x){
                tween1.start();
            }
        }
        if (ScrollAnim == "Splash"){
            camera.position.x = 2.5;
            camera.position.y = 4;
            camera.position.z = 1.2;       
        }

        if (ScrollAnim == "Port1"){   
            camera.position.x = 0.48;
            camera.position.y = 5.5;
            camera.position.z = 4.17;     
        }
    }

    //Allow window resizing
    // function onWindowResize(){
    //     camera.aspect = container.clientWidth/ container.clientHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(container.clientWidth, container.clientHeight);
    // }
    // window.addEventListener('resize', onWindowResize);

    window.addEventListener("scroll", updateCamera);

    //display
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    TWEEN.update();
}

jQuery( document ).ready( function ($) {
	$(document).ready(function() {
        init();
	});
} );

