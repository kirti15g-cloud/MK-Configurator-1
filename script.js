// ======================================================
// MillerKnoll Configurator
// script.js
// ======================================================

const cards = document.querySelectorAll(".option-card");

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Remove selected state
        cards.forEach(function(c) {
            c.classList.remove("selected");
        });

        // Select current card
        card.classList.add("selected");

        // Read HTML data
        const material = card.dataset.material;
        const finish = card.dataset.finish;

        console.log("Material:", material);
        console.log("Finish:", finish);

        // Send selection to Sketchfab
        changeMaterial(material, finish);

    });

});