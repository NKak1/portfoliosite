"use strict";

const cursor = document.querySelector("#cursor");
const grid = document.querySelector("#grid");
const header = document.querySelector("header");
const sections = document.querySelectorAll(".fade");

const mainImage = document.querySelector(".main-image img");
const galleryImages = document.querySelectorAll(".gallery-grid img");

const glitch = document.querySelector("#glitch");

if(cursor){

    document.addEventListener("mousemove",(e)=>{

        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

    });

    document.querySelectorAll("a,img").forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            cursor.classList.add("active");

        });

        item.addEventListener("mouseleave",()=>{

            cursor.classList.remove("active");

        });

    });

}

if(grid){

    document.addEventListener("mousemove",(e)=>{

        const moveX =
        (e.clientX-window.innerWidth/2)*0.01;

        const moveY =
        (e.clientY-window.innerHeight/2)*0.01;

        grid.style.transform=
        `translate(${moveX}px,${moveY}px)`;

    });

}

window.addEventListener("scroll",()=>{

    if(window.scrollY>30){

        header.classList.add("scroll");

    }else{

        header.classList.remove("scroll");

    }

});

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

sections.forEach(section=>{

    observer.observe(section);

});

if(mainImage){

    window.addEventListener("scroll",()=>{

        const scroll = window.scrollY;

        mainImage.style.transform=
        `scale(${1+scroll*0.00008})`;

    });

}

galleryImages.forEach(image=>{

    image.addEventListener("click",()=>{

        if(!mainImage)return;

        mainImage.animate([

            {
                opacity:0,
                transform:"scale(.97)"
            },

            {
                opacity:1,
                transform:"scale(1)"
            }

        ],{

            duration:450,
            easing:"ease"

        });

        mainImage.src=image.src;

    });

});

galleryImages.forEach(image=>{

    image.addEventListener("mouseenter",()=>{

        image.animate([

            {
                transform:"translateY(0)"
            },

            {
                transform:"translateY(-8px)"
            }

        ],{

            duration:250,
            fill:"forwards"

        });

    });

});

document.querySelectorAll("a").forEach(link=>{

    const href = link.getAttribute("href");

    if(
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("http")
    ){
        return;
    }

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        if(glitch){

            glitch.classList.add("play");

        }

        shake();

        setTimeout(()=>{

            window.location.href = href;

        },450);

    });

});

function shake(){

    document.body.animate([

        {transform:"translate(0,0)"},
        {transform:"translate(-3px,2px)"},
        {transform:"translate(4px,-2px)"},
        {transform:"translate(-2px,3px)"},
        {transform:"translate(2px,-1px)"},
        {transform:"translate(0,0)"}

    ],{

        duration:180,
        easing:"ease-out"

    });

}

let time = 0;

function floatingAnimation(){

    if(mainImage){

        time += 0.01;

        const offset = Math.sin(time) * 5;

        mainImage.style.translate =
        `0 ${offset}px`;

    }

    requestAnimationFrame(floatingAnimation);

}

floatingAnimation();

window.addEventListener("pageshow",()=>{

    document.body.classList.add("loaded");

});

window.addEventListener("resize",()=>{

    if(window.innerWidth < 768){

        if(cursor){

            cursor.style.display="none";

        }

    }else{

        if(cursor){

            cursor.style.display="block";

        }

    }

});

window.dispatchEvent(new Event("resize"));

console.log(`

────────────────────────────

WORK PAGE

LIMINAL / GEOMETRY

Designed with
HTML + CSS + JavaScript

────────────────────────────

`);