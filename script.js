"use strict";

const loader = document.querySelector("#loader");
const cursor = document.querySelector("#cursor");
const header = document.querySelector("header");
const grid = document.querySelector("#grid");

const cards = document.querySelectorAll(".card");
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav a");
const heroTitle = document.querySelector(".hero h1");
const glitch = document.querySelector("#glitch");

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1200);

});


if (cursor) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

    });

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            cursor.classList.add("active");

        });

        card.addEventListener("mouseleave", () => {

            cursor.classList.remove("active");

        });

    });

}

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scroll");

    } else {

        header.classList.remove("scroll");

    }

});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

sections.forEach(section => {

    section.classList.add("fade");

    observer.observe(section);

});

cards.forEach(card => {

    observer.observe(card);

});

if (grid) {

    document.addEventListener("mousemove", (e) => {

        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        grid.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });

}

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    heroTitle.style.transform =
        `translateY(${scroll * 0.2}px)`;

    heroTitle.style.letterSpacing =
        `${0.08 + scroll * 0.0008}em`;

});

cards.forEach(card => {

    const image = card.querySelector("img");

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const moveX = (x - 0.5) * 18;
        const moveY = (y - 0.5) * 18;

        image.style.transform =
            `translate(${moveX}px, ${moveY}px) scale(1.08)`;

    });

    card.addEventListener("mouseleave", () => {

        image.style.transform =
            "translate(0,0) scale(1)";

    });

});

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 180;

        if (window.scrollY >= top) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("current");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("current");

        }

    });

});

let time = 0;

function floatingAnimation() {

    time += 0.01;

    cards.forEach((card, index) => {

        const image = card.querySelector("img");

        const offset =
            Math.sin(time + index * 0.8) * 5;

        image.style.translate =
            `0 ${offset}px`;

    });

    requestAnimationFrame(floatingAnimation);

}

floatingAnimation();

cards.forEach(card => {

    card.addEventListener("click", () => {

        if (!glitch) return;

        glitch.classList.add("play");

        shake();

        setTimeout(() => {

            const url = card.dataset.link;

            if (url) {

                window.location.href = url;

            }

        }, 450);

    });

});

function shake() {

    document.body.animate([

        { transform: "translate(0px,0px)" },
        { transform: "translate(-3px,2px)" },
        { transform: "translate(4px,-2px)" },
        { transform: "translate(-2px,3px)" },
        { transform: "translate(2px,-1px)" },
        { transform: "translate(0px,0px)" }

    ], {

        duration: 180,
        easing: "ease-out"

    });

}


cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.animate([

            {
                transform: "translateY(0px)"
            },
            {
                transform: "translateY(-12px)"
            }

        ], {

            duration: 300,
            fill: "forwards",
            easing: "ease-out"

        });

    });

});

window.addEventListener("pageshow", () => {

    if (loader) {

        loader.classList.add("hide");

    }

});

document.body.classList.add("loaded");

window.addEventListener("resize", () => {

    if (window.innerWidth < 768 && cursor) {

        cursor.style.display = "none";

    } else if (cursor) {

        cursor.style.display = "block";

    }

});

window.dispatchEvent(new Event("resize"));


console.log(`
────────────────────────────

LIMINAL / GEOMETRY

Portfolio Project

Designed with
HTML + CSS + JavaScript

────────────────────────────
`);