//Both GSAP and global vars are set here
//GSAP
window.addEventListener('load', function () {
    gsap.from('#Splash', {duration: 1, y: '-10%', opacity: 0});

    //Table of Contents
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('#TOCTitle', {
        scrollTrigger: '#TOCTitle',
        x: -100,
        opacity: 1,
        duration: 1
    });
    gsap.from('#TOCItemsBG', {
        scrollTrigger: '#TOCItemsBG',
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .5
    });

    gsap.from('#TOCItems', {
        scrollTrigger: '#TOCItemsBG',
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1,
        stagger: .2
    });

    //Cargobike
    gsap.from('#CargobikeBlock', {
        scrollTrigger: '#CargobikeBlock',
        opacity: 0,
        duration: 1
    });

    gsap.from('#CbImage', {
        scrollTrigger: '#CbImage',
        opacity: 0,
        duration: 1
    });

    //POTP
    gsap.from('#POTPBlock', {
        scrollTrigger: '#POTPBlock',
        opacity: 0,
        duration: 1
    });
    
    //Portfolio1
    gsap.from('#Port1BG', {
        scrollTrigger: '#Port1BG',
        x: -100,
        opacity: 1,
        duration: 1
    });
    gsap.from('#Port1Text', {
        scrollTrigger: '#Port1BG',
        y: -100,
        opacity: 0,
        duration: .5
    });

    gsap.from('#Port1Img', {
        scrollTrigger: '#Port1Img',
        y: '+10%',
        opacity: 0,
        ease: 'bounce',
        duration: 1,
        stagger: .2
    });
    
    //Portfolio2
    gsap.from('#Port2Text', {
        scrollTrigger: '#Port2BG',
        y: -100,
        opacity: 0,
        duration: .5,
        delay: 0.9
    });

    gsap.from('#Port2Img', {
        scrollTrigger: '#Port2Img',
        y: '+10%',
        opacity: 0,
        ease: 'bounce',
        duration: 1,
        delay: .5,
        stagger: .2
    });

    //Portfolio3
    gsap.from('#Port3Text', {
        scrollTrigger: '#Port3BG',
        y: -100,
        opacity: 0,
        duration: .5,
        delay: 0.9
    });

    gsap.from('#Port3Img', {
        scrollTrigger: '#Port3Img',
        y: '+10%',
        opacity: 0,
        ease: 'bounce',
        duration: 1,
        delay: .5,
        stagger: .2
    });

    //Portfolio4
    gsap.from('#Port4Img', {
        scrollTrigger: '#Port4Img',
        y: '+10%',
        opacity: 0,
        ease: 'bounce',
        duration: 1,
        stagger: .2
    });

    //About me
    gsap.from('#AboutMe', {
        scrollTrigger: '#AboutMe',
        y: 200,
        opacity: 0,
        duration: 1
    });

    gsap.registerPlugin(ScrollToPlugin);

    //Navbar
    const button = document.querySelector("#navbutton");
    const navto1 = document.querySelector("#navto1");
    const navto2 = document.querySelector("#navto2");
    const navto3 = document.querySelector("#navto3");
    const navto4 = document.querySelector("#navto4");
    const navto5 = document.querySelector("#navto5");
    const navto6 = document.querySelector("#navto6");
    const exit = document.querySelector("#navclose");

    var tl = gsap.timeline({defaults:{ease: Back.easeOut.config(2)}});
    tl.paused(true);
    tl.to("#navmenu", {display: 'block', opacity: 1, duration: .02});
    tl.to("#navitem", {opacity: 1, y: '-10%', stagger: .05});
    
    
    tlcb = gsap.timeline({defaults:{ease: Back.easeOut.config(2)}});
    tlcb.paused(true);
    tlcb.to(window, {duration:.5, scrollTo: "#CargobikeBlock", delay: .5});

    button.addEventListener('click', () => {
        //Activate open menu animatopm
        tl.play();
    })

    exit.addEventListener('click', ()=>{
        //Close menu
        tl.reverse(.5);
    })

    navto1.addEventListener('click', () => {
        //Close menu
        tl.reverse(.5);
    });
    navto2.addEventListener('click', () => {
        //Close menu
        tl.reverse(.5);
    });
    navto3.addEventListener('click', () => {
        //Close menu
        tl.reverse(.5);
    });
    navto4.addEventListener('click', () => {
        //Close menu
        tl.reverse(.5);
    });
    navto5.addEventListener('click', () => {
        //Close menu
        tl.reverse(.5);
    });
});