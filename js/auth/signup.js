// implémenter le js de ma page signup
if (isConnected()) {
    const role = normalizeRole(getRole());

    if (role === "client") {
        window.location.replace("/account");
    } else if (role === "admin") {
        window.location.replace("/admin");
    }
    
}
const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("ValidateInscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);
btnValidation.addEventListener("click", InscrireUtilisateur);

function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPrenom);
    const mailOk = validateMail(inputEmail);
    const passwordOk = validatePassword(inputPassword);

    if (nomOk && prenomOk && mailOk && passwordOk) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}

function validateMail(input) {
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePassword(input) {
    //Définir mon regex
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

function validateRequired(input) {
    if (input.value != "") {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function InscrireUtilisateur() {

    const dataForm = new FormData(formInscription);


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        firstName: dataForm.get("NomInput"),
        lastName: dataForm.get("PrenomInput"),
        email: dataForm.get("EmailInput"),
        password: dataForm.get("PasswordInput"),
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(apiUrl+"registration", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json()
            }
            else {
                alert("Erreur lors de l'inscription, veuillez réessayer.");
            }
        
        })
        .then(result => {
            alert("Inscription réussie ! "+dataForm.get("PrenomInput")+" Vous pouvez vous connecter.");
            document.location.href="/signin";
            
            
        })
            
        .catch((error) => console.error(error));
}



const toggle1 = document.getElementById("togglePassword1");
const toggle2 = document.getElementById("togglePassword2");

const icon1 = document.getElementById("iconPassword1");
const icon2 = document.getElementById("iconPassword2");

const input1 = document.getElementById("PasswordInput");
const input2 = document.getElementById("ValidatePasswordInput");

if (toggle1 && icon1 && input1) {
    toggle1.addEventListener("click", () => {
        const isPassword = input1.type === "password";
        input1.type = isPassword ? "text" : "password";
        icon1.classList.toggle("bi-eye", isPassword);
        icon1.classList.toggle("bi-eye-slash", !isPassword);
    });
}

if (toggle2 && icon2 && input2) {
    toggle2.addEventListener("click", () => {
        const isPassword = input2.type === "password";
        input2.type = isPassword ? "text" : "password";
        icon2.classList.toggle("bi-eye", isPassword);
        icon2.classList.toggle("bi-eye-slash", !isPassword);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Cible tous les champs texte, email et password du formulaire
    const inputs = document.querySelectorAll("form input");

    inputs.forEach(input => {
        // Applique un autocomplete personnalisé ou neutre
        input.setAttribute("autocomplete", "new-password");
    });
});
