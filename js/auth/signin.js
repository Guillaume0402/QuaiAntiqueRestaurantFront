const mailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    // Ici, il faudra appeler l'API pour vérifier les credentials en BDD

    if (mailInput.value == "test@mail.com" && passwordInput.value == "123") {
        //il faudra récupérer le vrai token
        const token = "opipoifdgpoipogrjklsfdljksdijrfgoliloijsrdfglijo";
        setToken(token);
        //placer ce token en cookie

        setCookie("role", "admin", 7);

        window.location.replace("/");
    } else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}
