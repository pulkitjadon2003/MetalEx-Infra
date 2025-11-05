

function locomotive() {
            gsap.registerPlugin(ScrollTrigger);

            // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

            const locoScroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true
            });
            // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
            locoScroll.on("scroll", ScrollTrigger.update);

            // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
            ScrollTrigger.scrollerProxy("#main", {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
            });

            // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

            // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
            ScrollTrigger.refresh();


}

function loadingAnimations() {
    let overlay = document.querySelector("#overlay")
    let img = document.querySelector("#overlay img")
    let loader = document.querySelector("#loader")

    const tl = gsap.timeline()
    
    tl.from(overlay,{
        height: '0',
        width : '0',
        delay:.5,
        duration:.4
    },"sync")

    tl.to(overlay,{
        height: '150vh',
        width: '280vh',
        delay:1,
        duration:.8,
    },"sync")

    tl.to(loader,{
        y:"-100%",
        duration:.6,
    })


    tl.from("#page1 #content :is(h1,p) ",{
        y:100,
        opacity:0,
        stagger:.2,
    })

}


function scrollAnimations(){
    const tl = gsap.timeline({ scrollTrigger:{
            trigger:'#center>h3',
            scroller:"#main",
            start:'top 80%',
            end:"top 70%",
            // markers:true,
        }})

    tl.from("#page2 #center>h3",{
        opacity:0,
        y:100,
        duration:.6,
    })

    tl.from(".box , .rectangle",{
        opacity:0,
        y:100,
        stagger:.1,
    })

    gsap.from("#achivements",{
        opacity:0,
        y:100,
        scrollTrigger:{
            trigger:'#achivements',
            scroller:"#main",
            start:'top 80%',
            end:"top 70%",
            // markers:true,

    }})

    let tl2 = gsap.timeline({
        
        scrollTrigger:{
            trigger:'#page3 h2',
            scroller:"#main",
            start:'top 80%',
            end:"top 70%",
            // markers:true,

    }})

    tl2.from('#page3 h2',{
        opacity:0,
        y:100,
        duration:.6,
    })

    tl2.from("#page3 #Gallery .photo",{
        opacity:0,
        duration:.8,
        scale:.9
    })

    let foottl = gsap.timeline({
        scrollTrigger:{
            trigger:"#foot1",
            scroller:'#main',
            // markers:true,
            start:'top 80%',
            end:"top 80%"
        }
    })

    foottl.from('#foot1 div , #foot1 p',{
        opacity:0,
        y:20,
        stagger:.2,
        delay:.1

    })

    foottl.from('#foot2',{
        opacity:0,
        y:20,

    })

    foottl.from('#footer #map',{
        opacity:0,
        y:20,

    })
}



locomotive()
loadingAnimations()
scrollAnimations()