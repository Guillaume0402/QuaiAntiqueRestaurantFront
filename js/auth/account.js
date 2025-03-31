console.log("account.js chargé !");

setTimeout(() => {
    const form = document.getElementById("accountForm");
    const deleteBtn = document.getElementById("deleteAccountBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const confirmModalEl = document.getElementById("confirmDeleteModal");
    const toastEl = document.getElementById("deleteToast");

    if (!form) {
        console.warn("Formulaire non trouvé !");
        return;
    }

    const confirmModal = new bootstrap.Modal(confirmModalEl);
    const deleteToast = new bootstrap.Toast(toastEl);

    console.log("Formulaire trouvé, lancement fetch...");

    // Pré-remplissage avec les vraies données
    fetch(apiUrl + "account/me", {
        headers: {
            "X-AUTH-TOKEN": getToken(),
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("[/account/me] Réponse API :", data);
            document.getElementById("NomInput").value = data.lastName;
            document.getElementById("PrenomInput").value = data.firstName;
            document.getElementById("AllergieInput").value = data.allergy ?? "";
            document.getElementById("NbConvivesInput").value =
                data.guestNumber ?? "";
        });

    // Soumission du formulaire
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = {
            firstName: document.getElementById("PrenomInput").value,
            lastName: document.getElementById("NomInput").value,
            allergy: document.getElementById("AllergieInput").value,
            guestNumber: parseInt(
                document.getElementById("NbConvivesInput").value
            ),
        };

        fetch(apiUrl + "account/edit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": getToken(),
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    alert("Vos informations ont été mises à jour !");
                } else {
                    alert("Une erreur est survenue.");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Erreur technique lors de la modification.");
            });
    });

    // Suppression du compte
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            console.log("Clique sur le bouton suppression");
            confirmModal.show();
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", () => {
            console.log("Confirmation suppression en cours...");
            fetch(apiUrl + "account/delete", {
                method: "DELETE",
                headers: {
                    "X-AUTH-TOKEN": getToken(),
                },
            })
                .then((res) => {
                    if (res.status === 204) {
                        confirmModal.hide();
                        deleteToast.show();

                        // Mise à jour immédiate de la navbar
                        eraseCookie("accesstoken");
                        eraseCookie("role");
                        showAndHideElementsForRoles(); // <-- important
                        updateNavbar(); // <-- si tu l’utilises aussi

                        // Redirection après 2-3 secondes
                        setTimeout(() => {
                            window.location.replace("/");
                        }, 2000);
                    } else {
                        alert("Erreur lors de la suppression du compte.");
                    }
                })
                .catch((err) => {
                    console.error("Erreur :", err);
                    alert("Erreur technique.");
                });
        });
    }
}, 100);
