module.exports = {
    proxy: "http://quaiantique.local",
    files: ["pages/**/*.html", "js/**/*.js", "scss/**/*.scss", "main.css"],
    watch: true,
    notify: true,
    open: true,
    browser: ["firefox", "chrome"], // ou ["default"] si tu veux ton navigateur par défaut
};
