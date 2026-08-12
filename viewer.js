// ======================================================
// MillerKnoll Configurator
// viewer.js
// ======================================================


// ======================================================
// SKETCHFAB MODEL
// ======================================================

const MODEL_UID = "c3c8d73f65324bae8deec5097b9acca2";

const iframe = document.getElementById("api-frame");

const client = new Sketchfab("1.12.1", iframe);


// ======================================================
// TABLE SURFACE TEXTURES
// ======================================================

const Laminate = {

    LBB:
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-1/main/images/table-surface/LBB.jpg",

    LBC:
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-1/main/images/table-surface/LBC.jpg",

    WarmAsh140:
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-1/main/images/table-surface/140%20Warm%20Ash.jpg",

    LightAsh139:
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-1/main/images/table-surface/139%20Light%20Ash.jpg"

};


// ======================================================
// TABLE LEG / METAL COLORS
// ======================================================

const legColors = {

    White91: [0.91, 0.91, 0.91, 1],

    MS: [0.45, 0.45, 0.45, 1],

    G1: [0.15, 0.15, 0.15, 1],

    CL: [0.65, 0.65, 0.65, 1]

};


// ======================================================
// START SKETCHFAB VIEWER
// ======================================================

client.init(MODEL_UID, {

    success: function(api) {

        window.sketchfabAPI = api;

        api.start(function() {

            console.log("Sketchfab Viewer Ready!");

        });

    },

    error: function() {

        console.error(
            "Sketchfab Viewer Failed to Load."
        );

    }

});


// ======================================================
// CHANGE MATERIAL
// ======================================================

window.changeMaterial = function(materialName, finish) {

    console.log(
        "Changing material:",
        materialName
    );

    console.log(
        "Selected finish:",
        finish
    );


    // --------------------------------------------------
    // CHECK SKETCHFAB
    // --------------------------------------------------

    if (!window.sketchfabAPI) {

        console.error(
            "Sketchfab API is not ready."
        );

        return;

    }


    // --------------------------------------------------
    // GET MATERIAL LIST
    // --------------------------------------------------

    window.sketchfabAPI.getMaterialList(
        function(err, materials) {

            if (err) {

                console.error(
                    "Could not get materials."
                );

                return;

            }


            // --------------------------------------------------
            // FIND MATERIAL
            // --------------------------------------------------

            const material = materials.find(
                function(mat) {

                    return mat.name === materialName;

                }
            );


            if (!material) {

                console.error(
                    "Material not found:",
                    materialName
                );

                return;

            }


            console.log(
                "Material found:",
                material.name
            );


            // ==================================================
            // TABLE SURFACE
            // ==================================================

            if (
                materialName === "adskMatWorkSurface_Wood" &&
                surfaceTextures[finish]
            ) {

                const textureURL =
                    surfaceTextures[finish];


                console.log(
                    "Loading texture:",
                    textureURL
                );


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


                        // Apply texture

                        material.channels.AlbedoPBR.texture = {

                            uid: textureUID

                        };


                        // Enable Albedo

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
                                    finish +
                                    " texture applied successfully!"
                                );

                            }
                        );

                    }
                );

            }


            // ==================================================
            // TABLE LEGS / METAL
            // ==================================================

            if (
                materialName === "adskMatTableLegs_Metal" &&
                legColors[finish]
            ) {

                const color =
                    legColors[finish];


                console.log(
                    "Applying metal color:",
                    color
                );


                // Remove existing texture

                material.channels.AlbedoPBR.texture = null;


                // Apply color

                material.channels.AlbedoPBR.color =
                    color;


                // Enable Albedo

                material.channels.AlbedoPBR.enable = true;


                // Apply material

                window.sketchfabAPI.setMaterial(
                    material,
                    function(err) {

                        if (err) {

                            console.error(
                                "Could not apply metal color.",
                                err
                            );

                            return;

                        }


                        console.log(
                            finish +
                            " metal color applied successfully!"
                        );

                    }
                );

            }

        }
    );

};