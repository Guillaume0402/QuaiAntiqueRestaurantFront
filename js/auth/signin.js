const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("redirected") === "true") {
    showRedirectAlert();
}

// Redirection auto si déjà connecté
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("redirected") === "true") {
        showRedirectAlert();
    }

    if (isConnected()) {
        const role = normalizeRole(getRole());
        if (role === "client") {
            window.location.replace("/account");
        } else if (role === "admin") {
            window.location.replace("/admin");
        }
    }
});

const mailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("formulaireConnexion");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    const dataForm = new FormData(signinForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: dataForm.get("emailInput"),
        password: dataForm.get("passwordInput"),
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(apiUrl + "login", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // Sélectionne l'élément du toast
                const toastElement = document.getElementById("toastLoginError");

                // Initialise le toast avec options
                const toast = new bootstrap.Toast(toastElement, {
                    delay: 4000,
                    autohide: true,
                });

                // Affiche le toast
                toast.show();

                // Marque les inputs comme invalides
                mailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");

                throw new Error("Identifiants invalides");
            }
        })
        .then((result) => {
            const token = result.apiToken;
            const role = normalizeRole(result.roles[0]); // Transforme "ROLE_USER" en "client"

            setToken(token);
            setCookie(roleCookieName, role, 7); // ← Stocke un rôle lisible par le routeur

            // Redirection selon le rôle
            if (role === "client") {
                window.location.replace("/account");
            } else if (role === "admin") {
                window.location.replace("/admin");
            } else {
                window.location.replace("/");
            }
        })
        .catch((error) => console.error(error));
}

// Fonction pour normaliser les rôles Symfony pour le front
function normalizeRole(role) {
    switch (role) {
        case "ROLE_USER":
            return "client";
        case "ROLE_ADMIN":
            return "admin";
        default:
            return role;
    }
}

function showRedirectAlert() {
    const container = document.createElement("div");
    container.className = "alert alert-warning text-center mt-3";
    container.role = "alert";
    container.textContent =
        "Veuillez vous connecter pour accéder à cette page.";

    const form = document.getElementById("formulaireConnexion");
    form.parentNode.insertBefore(container, form);
}

const toggle = document.getElementById("togglePassword");
const icon = document.getElementById("toggleIcon");

if (toggle && passwordInput && icon) {
    toggle.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";

        icon.classList.toggle("bi-eye", isPassword);
        icon.classList.toggle("bi-eye-slash", !isPassword);
    });
}
