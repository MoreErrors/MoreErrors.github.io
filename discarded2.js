import * as THREE from './build/three.module.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import * as dat from './examples/jsm/libs/dat.gui.module.js';
//import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

//Vars: Canvas
let container, camera, camx, camy, camz, renderer, scene;
let raycaster;
let conWidth, conHeight;

camx = 0;
camy = 0;
camz = 2;
let y;
let position;


//Raycaster
let mouse;
let intersect;
let intersects;
let objs;
let object;

//Generate
function init(){
    const gui = new dat.GUI();
    raycaster = new THREE.Raycaster();

    //Set canvas
    container = document.querySelector('.scene');   
    scene = new THREE.Scene();
    conWidth = container.clientWidth;
    conHeight = container.clientHeight;

    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 2);
    scene.add(camera);

    gui.add(camera.position, 'y').min(-5).max(10);

    //Set light
    const pointLight = new THREE.DirectionalLight(0xFFFFFF, .4);
    pointLight.position.set(2, 3, 4);
    pointLight.castShadow = true;
    scene.add(pointLight)
    
    //Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneBufferGeometry(.9, 1.7);

    for (let i = 1; i < 5; i++){
        const material = new THREE.MeshBasicMaterial({
            map: textureLoader.load(`/images/${i}.jpg`)
        })
        const img = new THREE.Mesh(geometry, material)
        img.position.set(Math.random()+.6, i * -2.2);
        scene.add(img)
    }


    objs = [];
    scene.traverse((object) => {
        if(object.isMesh)
            objs.push(object);
    })
    
    //Scroll
    window.addEventListener("wheel", onMouseWheel);
    y = 0;
    position = 0;

    function onMouseWheel(event){
        y = event.deltaY * -.003;
    }
    
    //Track mouse x and y coordinates
    mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX / conWidth * 2 - 1;
        mouse.y = (event.clientY / conHeight) * 2 - 1;
    })

    //Allow window resizing
    function onWindowResize(){
        camera.aspect = container.clientWidth/ container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onWindowResize);

    //display
    animate();
}

function animate(){  
    //Update
    position += y;
    y *= .8;

    camera.position.y = - position;

    //Raycaster
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(objs);

    for(intersect of intersects){
        gsap.to(intersect.object.scale, {x: 1.7, y: 1.7});
        gsap.to(intersect.object.rotation, {y: -.5});
        gsap.to(intersect.object.position, {z: -0.9});
        //intersect.object.scale.set(1.1, 1.1);
    }

    for(object of objs){
        if(!intersects.find(intersect => intersect.object == object)){
            //object.scale.set(1,1);
            gsap.to(object.scale, {x: 1, y: 1});
            gsap.to(object.rotation, {y: 0});
            gsap.to(object.position, {z: 0});
        }
    }
    camera.position.y = position;
    renderer.render(scene,camera);

    requestAnimationFrame(animate);
}

jQuery( document ).ready( function ($) {
    init();
} );

