const tokenCookieName = "accesstoken";
const roleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "http://127.0.0.1:8000/api/";


signoutBtn.addEventListener("click", signout);

function getRole() {
    return getCookie(roleCookieName);
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);

    showAndHideElementsForRoles();
    updateNavbar();
    
    window.location.reload();
}

function logout() {
    deleteToken(); // supprime le token
    localStorage.removeItem("role"); // supprime le rôle stocké si tu l'utilises
    window.location.replace("/"); // redirection vers la page d'accueil
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function deleteToken() {
    localStorage.removeItem("authToken");
}


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (const element of ca) {
        let c = element;
        while (c.startsWith(" ")) c = c.substring(1, c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function isConnected() {
    if (getToken() == null || getToken() == undefined) {
        return false;
    } else {
        return true;
    }
}


function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll("[data-show]");

    allElementsToEdit.forEach((element) => {
        switch (element.dataset.show) {
            case "disconnected":
                if (userConnected) {
                    element.classList.add("d-none");
                } else {
                    element.classList.remove("d-none");
                }
                break;
            case "connected":
                if (!userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case "admin":
                if (!userConnected || role != "admin") {
                    element.classList.add("d-none");
                }
                break;
            case "client":
                if (!userConnected || role != "client") {
                    element.classList.add("d-none");
                }
                break;
        }
    });
}



function updateNavbar() {
    const isLogged = isConnected();
    document.querySelectorAll(".only-connected").forEach(el => {
        el.style.display = isLogged ? "inline-block" : "none";
    });

    document.querySelectorAll(".only-disconnected").forEach(el => {
        el.style.display = !isLogged ? "inline-block" : "none";
    });
}



