// ======================================================
// MillerKnoll Configurator
// script.js
// ======================================================

const cards = document.querySelectorAll(".option-card");

cards.forEach(card => {

    card.addEventListener("click", function () {

        // Remove selected state from all cards
        cards.forEach(c => c.classList.remove("selected"));

        // Add selected state to clicked card
        card.classList.add("selected");

        // Read material and finish
        const material = card.dataset.material;
        const finish = card.dataset.finish;

        console.log("Material:", material);
        console.log("Finish:", finish);

        // Send the selected material to Sketchfab
        if (window.changeMaterial) {
            window.changeMaterial(material, finish);
        } else {
            console.error("changeMaterial function is not available.");
        }

    });

});