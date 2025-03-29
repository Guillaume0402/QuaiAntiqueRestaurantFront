import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [    
    new Route("/", "Accueil", "pages/home.html", []),            
    new Route("/galerie", "Galerie", "pages/galerie.html", []),            
    new Route("/signin", "Connexion", "pages/auth/signin.html", ["diconnected"], "/js/auth/signin.js"),            
    new Route("/signup", "Inscription", "pages/auth/signup.html", ["diconnected"], "/js/auth/signup.js"),           
    new Route("/account", "Mon compte", "pages/auth/account.html", ["client", "admin"]),           
    new Route("/editPassword", "Modifier mot de passe", "pages/auth/editPassword.html", ["client", "admin"]),           
    new Route("/allResa", "Vos réservations", "pages/reservations/allResa.html", ["client"]),           
    new Route("/reserver", "Réserver", "pages/reservations/reserver.html", ["client"]),           
    new Route("/menus", "Nos Menus", "pages/menus.html", []),           
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";       