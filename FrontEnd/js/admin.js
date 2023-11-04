
let token = localStorage.getItem("token");
if (token) {
  // affichage du bando qd sophie est connectée
  document.querySelector(".bando").classList.remove("hidden");

  //affichage du bouton modifier qd sophie est connectée
  document.getElementById("modifier").style.display = "flex";

  //affichage du bouton modifiers qd sophie est connectée
  document.getElementById("modifiers").style.display = "flex";

  // cacher les boutons filters qd sophie est connectée
  document.getElementById("filter").style.display = "none";

  // remplacer le login par logout
  document.getElementById("login").innerText = "logout";

  document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("token");
    document.getElementById("login").innerText = "login";

    // cacher le bando qd sophie est déconnectée
    document.querySelector(".bando").classList.add("hidden");

    //cacher le bouton modifier qd sophie est déconnectée
    document.getElementById("modifier").style.display = "none";

    //cacher le bouton modifiers qd sophie est déconnectée
    document.getElementById("modifiers").style.display = "none";

    // afficher les boutons filters qd sophie est déconnectée
    document.getElementById("filter").style.display = "flex";
  });
}