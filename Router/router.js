import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "pages/404.html", []);

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
    
    let currentRoute = null;
    // Parcours de toutes les routes pour trouver la correspondance
    allRoutes.forEach((element) => {
        if (element.url == url) {
            currentRoute = element;
        }
    });
    // Si aucune correspondance n'est trouvée, on retourne la route 404
    if (currentRoute != null) {
        return currentRoute;
    } else {
        return route404;
    }
};

const LoadContentPage = async () => {
    const path = window.location.pathname;
    const actualRoute = getRouteByUrl(path);
    
// Vérification des autorisations d'accès à la page
const AllRolesArray = actualRoute.authorize;

if(AllRolesArray.length > 0) {
    if(AllRolesArray.includes("disconnected")) {
        if(isConnected()) {
            window.location.replace("/");
        }
    }
    else{
        const roleUser = getRole();
        if(!AllRolesArray.includes(roleUser)) {
            // L'utilisateur a le rôle requis
            window.location.replace("/");
        }
    }
}


    const mainPage = document.getElementById("main-page");
    // On applique une animation de sortie (si tu veux faire un effet fade-out aussi)
    mainPage.classList.remove("show");
    mainPage.classList.add("fade-in");

    // Ajoute un petit délai pour laisser le temps à fade-out (facultatif)
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Fetch du HTML
    const html = await fetch(actualRoute.pathHtml).then((data) => data.text());

    // Injection du contenu
    mainPage.innerHTML = html;

    // Active l’animation d’entrée
    setTimeout(() => {
        mainPage.classList.add("show");
    
        // Démarre les effets au scroll après chargement du contenu
        initScrollReveal();
    }, 50);

    // Si JS externe à charger
    if (actualRoute.pathJS != "") {
        const scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = actualRoute.pathJS;
        document.body.appendChild(scriptTag);
    }
    // Changement du titre de la page
    document.title = actualRoute.title + " - " + websiteName;

    // afficher et masquer les éléments en fonction du rôle de l'utilisateur
    showAndHideElementsForRoles();

};


const routeEvent = (event) => {
    event = event || window.event;
    event.preventDefault();
    // Mise à jour de l'URL dans l'historique du navigateur
    window.history.pushState({}, "", event.target.href);
    // Chargement du contenu de la nouvelle page
    LoadContentPage();
};


function initScrollReveal() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // une seule fois
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}


// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();

