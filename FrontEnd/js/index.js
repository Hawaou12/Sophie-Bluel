fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
        console.log(works);
        createWorks(works);
        initCategories(works);
    });

function initCategories(works) {
    fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
        .then((categoriesData) => {
            //console.log(categoriesData);
            createCategories(categoriesData, works);
        });
}

function createWorks(works) {
    const myDiv = document.getElementById("myGallery");
    myDiv.innerHTML = "";

    const modalGallery = document.getElementById("modalGallery");
    let html = "";

    for (const work of works) {
        const itemFigure = document.createElement("figure");

        const itemImg = document.createElement("img");
        itemImg.setAttribute("src", work.imageUrl);

        const itemFigCaption = document.createElement("figcaption");
        itemFigCaption.textContent = work.title;

        itemFigure.appendChild(itemImg);
        itemFigure.appendChild(itemFigCaption);
        myDiv.appendChild(itemFigure);

        html += `<div class="photoA">
        <a href="#">	
            <i class="fa-sharp fa-regular fa-trash-can iconPoubelle" id="${work.id}"></i>
            <img src="${work.imageUrl}" alt="${work.title} "class="imageA">
         </a>
        <div class="detailPhotos">
            <div class="detail_photoA">éditer</div>
        </div>
    </div>`;
    }
    modalGallery.innerHTML = html;
}

////    creation des boutons flitres (par catégorie)
function createCategories(categoriesData, works) {
    const myDiv = document.getElementById("filter");
    for (const categorie of categoriesData) {
        let button = document.createElement("button");
        button.className = "btn btnStyle";
        button.textContent = categorie.name;

        button.onclick = function (event) {
            changeState(event);
            filter(event.target.textContent, works);
        };
        myDiv.appendChild(button);
    }
}

//####  filter ######

function changeState(event) {
    const myButtons = document.getElementById("filter").children;

    for (const myButton of myButtons) {
        myButton.style.background = "white";
        myButton.style.color = "#1d6154";
    }

    const clickedElement = event.target;
    clickedElement.style.background = "#1d6154";
    clickedElement.style.color = "white";
}

// ##### apply filer

function filter(nameDuFiltre, works) {
    console.log(nameDuFiltre, works);
    // Filtre tes works
    createWorks(works);
}
