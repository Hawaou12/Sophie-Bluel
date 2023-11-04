//#################### Code JS Modal ######################
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modifier");
//var btn = document.getElementById("modifiers");

//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";

    //     const modalGallery = document.getElementById("modalGallery");
    //     let html = "";
    //     for (work of works) {
    //         html += `<div class="photoA">
    // 	<a href="#">
    // 		<i class="fa-sharp fa-regular fa-trash-can iconPoubelle" id="${work.id}"></i>
    // 		<img src="${work.imageUrl}" alt="${work.title} "class="imageA">
    // 	 </a>
    // 	<div class="detailPhotos">
    // 		<div class="detail_photoA">éditer</div>
    // 	</div>
    // </div>`;
    // }

    //     modalGallery.innerHTML = html;

    // recuperation des éléments par classe###########
    document.querySelectorAll(".iconPoubelle").forEach((element) => {
        element.addEventListener("click", function (e) {
            const imgPath = document.getElementsByName("imageA");
            const imgAttrib = imgPath.src;
            const imgElem = document.querySelector("img");
            //const imgPath = imgElem.src;
            console.log(e.target.id);

            let id = e.target.id;

            //#################### DELETE #####################
            fetch("http://localhost:5678/api/works/" + id, {
                headers: {
                    Authorization: "Bearer " + token,
                    //accept: "application/json",
                },
                method: "DELETE",
            });
            //console.log(imgPath)
        });
    });
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//***********Ouverture de la page du modal ajouter photo*************//

let modalAjouter = null;

// *******Ouverture du modal
function ouvre_modal_ajoute(e) {
    e.preventDefault;
    const model_page = document.getElementById("modalAjouter");
    model_page.style.display = null;
    model_page.removeAttribute("aria-hidden");
    modalAjouter = model_page;
    //modalAjouter?.addEventListener("click", fermer_modal_ajoute);
    modalAjouter.querySelector("modal-javascipt");
    //.addEventListener("click", stop);

    document.getElementById("ajouter").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("img_input").click();
    });

    //l'affichage de category null
    const category = document.getElementById("categorie");
    category.value = null;

    document.getElementById("btn_valider").addEventListener("click", function (event) {
        event.preventDefault();
        const mytitle = document.getElementById("input_modal");
        const mycat = document.getElementById("categorie");
        const myImage = document.getElementById("img_input");

        const errTile = document.getElementById("errorTitle");
        const errCat = document.getElementById("errorCategory");
        const errImg = document.getElementById("errorImg");

        errImg.style.display = "none";
        errTile.style.display = "none";
        errCat.style.display = "none";

        const data = new FormData(document.getElementById("modalAjouter"));
        //console.log (JSON.parse(data))

        // fetch works message d'erreur qd un des éléments est vide (image, titre, categorie) *******************

        if (myImage.value == "") {
            errImg.style.display = "block";
        }
        if (mytitle.value == "" && mycat.value != "") {
            errTile.style.display = "block";
        }
        if (mytitle.value != "" && mycat.value == "") {
            errCat.style.display = "block";
        }
        if (mytitle.value == "" && mycat.value == "") {
            errTile.style.display = "block";
            errCat.style.display = "block";
        }

        // qd aucun element n'est vide
        if (mytitle.value != "" && mycat.value != "" && myImage.value != "") {
            console.log("both has value");
            fetch("http://localhost:5678/api/works", {
                headers: {
                    Authorization: "Bearer " + token,
                    //accept: "application/json",
                },
                method: "POST",
                body: data,
            });
        }
    });
}

document.getElementById("ajouterModal").addEventListener("click", ouvre_modal_ajoute);

//const stop = function (e) {
//e.stop();};

//************fermer le modal  ajout photo **************//
function fermer_modal_ajoute(e) {
    e.preventDefault;
    const modalAjouter = document.getElementById("modalAjouter");
    modalAjouter.style.display = "none";
    modalAjouter.setAttribute("aria-hidden", "true");
    // modalAjouter?.removeEventListener("click", fermer_modal_ajoute);
}
document.getElementById("modal_close").addEventListener("click", fermer_modal_ajoute);

//*********la fleche de retoure
document.getElementById("left").addEventListener("click", fermer_modal_ajoute);

//**********************telecharger les photos***************************//
function telecharger() {
    const input = document.getElementById("img_input");

    var telecharge_image = "";

    const reader = new FileReader();
    reader.addEventListener("load", () => {
        telecharge_image = reader.result;
        const photo = document.getElementById("telecharger_image");
        document.getElementById("telechargerImage").style.display = null;

        photo.style.backgroundImage = `url(${telecharge_image} )`;
        document.getElementById("container_modalAjouter").style.display = "none";
    });
    reader.readAsDataURL(this.files[0]);
}

document.getElementById("img_input").addEventListener("change", telecharger);

// Api

fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        const categorieData = data;
        const mySelect = document.getElementById("categorie");

        for (i = 0; i < categorieData.length; i++) {
            const catName = categorieData[i].name;
            //console.log(catName);
            const optionItem = document.createElement("option");
            optionItem.textContent = catName;
            optionItem.value = categorieData[i].id;
            mySelect.appendChild(optionItem);
            /////////////
        }
    });
