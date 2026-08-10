// ======================================================
// MillerKnoll Configurator
// viewer.js
// ======================================================

// Sketchfab Model ID
const MODEL_UID = "be8d658f7bfe4e06bc364b429b6e8ebd";

// Sketchfab iframe
const iframe = document.getElementById("api-frame");

// Create Sketchfab viewer
const client = new Sketchfab("1.12.1", iframe);


// ======================================================
// START VIEWER
// ======================================================

client.init(MODEL_UID, {

    success: function(api) {

        window.sketchfabAPI = api;

        api.start(function() {

            console.log("Sketchfab Viewer Ready!");

            api.getMaterialList(function(err, materials) {

                if (err) {

                    console.error("Could not get materials.");

                    return;
                }

                console.log("Sketchfab Materials:");

                materials.forEach(function(material) {

                    console.log(material.name);

                });

            });

        });

    },

    error: function() {

        console.error("Sketchfab Viewer Failed to Load.");

    }

});


// ======================================================
// CHANGE MATERIAL
// ======================================================

window.changeMaterial = function(materialName, finish) {

    console.log("Changing material:", materialName);
    console.log("Selected finish:", finish);


    // Check if Sketchfab is ready

    if (!window.sketchfabAPI) {

        console.error("Sketchfab API is not ready.");

        return;

    }


    // Get Sketchfab materials

    window.sketchfabAPI.getMaterialList(function(err, materials) {

        if (err) {

            console.error("Could not get materials.");

            return;

        }


        // Find selected material

        const material = materials.find(function(mat) {

            return mat.name === materialName;

        });


        if (!material) {

            console.error("Material not found:", materialName);

            return;

        }


        console.log("Material found:", material.name);


        // ==================================================
        // WOOD TEST - LBB
        // ==================================================

        if (
            materialName === "adskMatWorkSurface_Wood" &&
            finish === "LBB"
        ) {

            // Texture URL
            const textureURL =
                "https://YOUR-GITHUB-LINK-HERE/LBB.jpg";


            console.log("Loading texture:", textureURL);


            // Add texture to Sketchfab

            window.sketchfabAPI.addTexture(
                textureURL,
                function(err, textureUID) {

                    if (err) {

                        console.error(
                            "Could not load texture.",
                            err
                        );

                        return;
                    }


                    console.log(
                        "Texture loaded:",
                        textureUID
                    );


                    // Apply texture to Albedo

                    material.channels.AlbedoPBR.texture = {
                        uid: textureUID
                    };


                    // Make sure Albedo is enabled

                    material.channels.AlbedoPBR.enable = true;


                    // Apply material

                    window.sketchfabAPI.setMaterial(
                        material,
                        function(err) {

                            if (err) {

                                console.error(
                                    "Could not apply material.",
                                    err
                                );

                                return;
                            }


                            console.log(
                                "LBB texture applied successfully!"
                            );

                        }
                    );

                }
            );

        }

    });

};