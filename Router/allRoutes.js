import Route from "./Route";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/QuaiAntiqueRestaurantFront/pages/home.html"),
    new Route("/", "Accueil", "pages/home.html"),];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";