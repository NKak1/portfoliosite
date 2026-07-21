"use strict";

const characterImage = document.querySelector("#characterImage");
const switchButtons = document.querySelectorAll(".switch-btn");

if (characterImage && switchButtons.length) {

    switchButtons.forEach(button => {

        button.addEventListener("click", () => {

            switchButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            characterImage.animate([
                {
                    opacity: 0,
                    transform: "scale(.97)"
                },
                {
                    opacity: 1,
                    transform: "scale(1)"
                }
            ], {
                duration: 350,
                easing: "ease"
            });

            characterImage.src = button.dataset.image;

        });

    });

}

if (characterImage) {

    characterImage.style.cursor = "zoom-in";

    characterImage.addEventListener("click", () => {

        const viewer = document.createElement("div");

        viewer.style.position = "fixed";
        viewer.style.inset = "0";
        viewer.style.background = "rgba(0,0,0,.85)";
        viewer.style.display = "flex";
        viewer.style.alignItems = "center";
        viewer.style.justifyContent = "center";
        viewer.style.zIndex = "999999";
        viewer.style.cursor = "zoom-out";

        const image = document.createElement("img");

        image.src = characterImage.src;
        image.style.maxWidth = "90vw";
        image.style.maxHeight = "90vh";
        image.style.objectFit = "contain";

        viewer.appendChild(image);

        document.body.appendChild(viewer);

        viewer.addEventListener("click", () => {

            viewer.remove();

        });

    });

}