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

    fetch(apiUrl+"login", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                mailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");
            }
        })
        .then((result) => {            
            const token = result.apiToken;
            setToken(token);
            //placer ce token en cookie

            setCookie(roleCookieName, result.roles[0], 7);
            window.location.replace("/");
        })

        .catch((error) => console.error(error));


}
