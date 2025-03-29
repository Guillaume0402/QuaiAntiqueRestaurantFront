export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        this.pathJS = pathJS;
        this.authorize = authorize;
    }
}

/*
[] => Tout le monde peut y accéder
["disconnected"] => Seulement les utilisateurs non connectés
["client"] => Seulement les utilisateurs avec le role client
["admin"] => Seulement les utilisateurs avec le role admin
["admin", "client"] => Seulement les utilisateurs avec le role admin ou client
 */
