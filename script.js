/* =========================================================
   SUPABASE CONFIGURATION
   ========================================================= */

const SUPABASE_URL = "https://ctpribwdigufddbwlesj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_MbLnWets_bal6baJWQ3Itg_OV4oPvlB";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =========================================================
   PAGE FUNCTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerHTML = isOpen ? "✕" : "☰";
        });


        // Close menu when a link is clicked
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.innerHTML = "☰";
            });

        });

    }


    /* =====================================================
       SCROLL ANIMATION
       ===================================================== */

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        revealItems.forEach(function (item) {

            observer.observe(item);

        });

    } else {

        // Fallback for older browsers
        revealItems.forEach(function (item) {

            item.classList.add("show");

        });

    }


    /* =====================================================
       CONTACT FORM - SUPABASE
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const successMessage =
        document.getElementById("successMessage");

    const errorMessage =
        document.getElementById("errorMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* -----------------------------------------
                   GET FORM VALUES
                   ----------------------------------------- */

                const name =
                    document.getElementById("name")?.value.trim();

                const email =
                    document.getElementById("email")?.value.trim();

                const phone =
                    document.getElementById("phone")?.value.trim();

                const service =
                    document.getElementById("service")?.value.trim();

                const message =
                    document.getElementById("message")?.value.trim();


                /* -----------------------------------------
                   VALIDATE REQUIRED FIELDS
                   ----------------------------------------- */

                if (!name || !email || !phone || !message) {

                    alert(
                        "Please complete all required fields."
                    );

                    return;
                }


                /* -----------------------------------------
                   SUBMIT BUTTON
                   ----------------------------------------- */

                const submitButton =
                    contactForm.querySelector(".submit-btn");


                if (submitButton) {

                    submitButton.innerHTML =
                        '<i class="fas fa-spinner fa-spin"></i> Sending...';

                    submitButton.disabled = true;
                }


                /* -----------------------------------------
                   HIDE OLD MESSAGES
                   ----------------------------------------- */

                if (successMessage) {

                    successMessage.style.display = "none";
                }

                if (errorMessage) {

                    errorMessage.style.display = "none";
                }


                /* -----------------------------------------
                   SEND TO SUPABASE
                   ----------------------------------------- */

                try {

                    const { error } =
                        await supabaseClient
                            .from("contact_messages")
                            .insert([
                                {
                                    name: name,
                                    phone: phone,
                                    email: email,
                                    service: service || null,
                                    message: message
                                }
                            ]);


                    /* -------------------------------------
                       CHECK FOR SUPABASE ERROR
                       ------------------------------------- */

                    if (error) {

                        throw error;
                    }


                    /* -------------------------------------
                       SUCCESS MESSAGE
                       ------------------------------------- */

                    if (successMessage) {

                        successMessage.style.display = "flex";

                        successMessage.innerHTML =
                            '<i class="fas fa-check-circle"></i>' +
                            '<span>Your message has been sent successfully!</span>';
                    }


                    /* -------------------------------------
                       UPDATE BUTTON
                       ------------------------------------- */

                    if (submitButton) {

                        submitButton.innerHTML =
                            '<i class="fas fa-check"></i> Message Sent';

                        submitButton.disabled = false;
                    }


                    /* -------------------------------------
                       CLEAR FORM
                       ------------------------------------- */

                    contactForm.reset();


                    /* -------------------------------------
                       KEEP SUCCESS MESSAGE FOR 5 SECONDS
                       ------------------------------------- */

                    setTimeout(function () {

                        if (successMessage) {

                            successMessage.style.display = "none";
                        }


                        if (submitButton) {

                            submitButton.innerHTML =
                                '<span>Send Message</span>' +
                                '<i class="fas fa-paper-plane"></i>';
                        }

                    }, 5000);


                } catch (error) {

                    /* -------------------------------------
                       ERROR
                       ------------------------------------- */

                    console.error(
                        "Supabase submission error:",
                        error
                    );


                    if (errorMessage) {

                        errorMessage.style.display = "flex";

                        errorMessage.innerHTML =
                            '<i class="fas fa-exclamation-circle"></i>' +
                            '<span>Sorry, your message could not be sent. Please try again.</span>';

                    } else {

                        alert(
                            "Sorry, your message could not be sent. Please try again."
                        );
                    }


                    /* -------------------------------------
                       RESET BUTTON
                       ------------------------------------- */

                    if (submitButton) {

                        submitButton.innerHTML =
                            '<span>Send Message</span>' +
                            '<i class="fas fa-paper-plane"></i>';

                        submitButton.disabled = false;
                    }

                }

            }
        );

    }

});


/* =========================================================
   QUICK CONTACT BUTTONS
   ========================================================= */

function makeCall() {

    window.location.href = "tel:0700093587";

}


function sendEmail() {

    window.location.href =
        "mailto:info@ringflow.co.ke";

}


function showLocation() {

    const address =
        "Mizpah Office Park, 3rd Floor, Right Wing, Kahawa Sukari";

    const mapURL =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(address);

    window.open(mapURL, "_blank");

}