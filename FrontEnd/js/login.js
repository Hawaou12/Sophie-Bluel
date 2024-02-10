console.log("link good!");
const form = document.getElementById("connexion-form");
const valid = document.getElementById("submit1");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formInfo = new FormData(form);
    const payload = new URLSearchParams(formInfo);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            accept: "application/json",
        },

        body: payload,
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            if (data.userId == 1) {
                localStorage.setItem("token", data.token);

                location.href = "index.html";
            }

            //show error
            else {
                errorMsg.innerText = " Erreur dans l’identifiant ou le mot de passe";
                document.getElementById("email").value = null;
                document.getElementById("password").value = null;

                function msgdelet() {
                    error.innerText = "";
                }
                setTimeout(msgdelet, 50000);
            }
        })

        .catch((err) => console.log(err));
});
