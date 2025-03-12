import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "pages/404.html");

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

// Fonction pour charger le contenu de la page

// const LoadContentPage = async () => {
//     const path = window.location.pathname;
//     const actualRoute = getRouteByUrl(path);

//     try {
//         // Récupération du contenu HTML avec UTF-8 forcé
//         const response = await fetch(actualRoute.pathHtml, {
//             headers: { "Content-Type": "text/html; charset=UTF-8" },
//         });

//         if (!response.ok)
//             throw new Error("Erreur lors du chargement de la page.");

//         const html = await response.text();
//         document.getElementById("main-page").innerHTML = html;

//         // Réappliquer les événements sur les liens après chaque changement de page
//         document.querySelectorAll("a").forEach((link) => {
//             link.addEventListener("click", routeEvent);
//         });

//         // Ajout du script JS spécifique si défini
//         if (actualRoute.pathJS && actualRoute.pathJS.trim() !== "") {
//             let scriptTag = document.createElement("script");
//             scriptTag.setAttribute("type", "text/javascript");
//             scriptTag.setAttribute("src", actualRoute.pathJS);
//             document.querySelector("body").appendChild(scriptTag);
//         }

//         // Mettre à jour le titre de la page
//         document.title = actualRoute.title + " - " + websiteName;
//     } catch (error) {
//         console.error("Erreur lors du chargement de la page :", error);
//     }
// };

const LoadContentPage = async () => {
    const path = window.location.pathname;
    // Récupération de l'URL actuelle
    const actualRoute = getRouteByUrl(path);
    // Récupération du contenu HTML de la route
    const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
    // Ajout du contenu HTML à l'élément avec l'ID "main-page"
    document.getElementById("main-page").innerHTML = html;
    // Ajout du contenu JavaScript
    if (actualRoute.pathJS != "") {
        // Création d'une balise script
        var scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", actualRoute.pathJS);
        // Ajout de la balise script au corps du document
        document.querySelector("body").appendChild(scriptTag);
    }
    // Changement du titre de la page
    document.title = actualRoute.title + " - " + websiteName;
};

// Fonction pour gérer les événements de routage (clic sur les liens)
// const routeEvent = (event) => {
//     event.preventDefault();
//     let link = event.target.closest("a");
//     if (!link || !link.href || link.target === "_blank") return; // Évite les erreurs et garde les liens externes
//     const url = new URL(link.href, window.location.origin);
//     if (url.origin !== window.location.origin) {
//         window.location.href = link.href; // Si c'est un lien externe, on le suit normalement
//         return;
//     }
//     // Mise à jour de l'historique
//     window.history.pushState({}, "", url.pathname);
//     LoadContentPage();
// };

const routeEvent = (event) => {
    event = event || window.event;
    event.preventDefault();
    // Mise à jour de l'URL dans l'historique du navigateur
    window.history.pushState({}, "", event.target.href);
    // Chargement du contenu de la nouvelle page
    LoadContentPage();
};

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();
