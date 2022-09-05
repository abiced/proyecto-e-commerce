let infoCats = localStorage.getItem("catID")

let info = `https://japceibal.github.io/emercado-api/cats_products/${infoCats}.json`

fetch(info)
.then(response => response.json())
.then(data => {
    let nameCategories = document.getElementById("categories")
    nameCategories.innerHTML = `${data.catName}`
    console.log(data.products)
    let divCars = document.getElementById('cars');
    for (let i=0; i < data.products.length; i++) {
        divCars.innerHTML += `
        <div onclick="setCatID(${data.products[i].id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${data.products[i].image}" alt="${data.products[i].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${data.products[i].name} - ${data.products[i].currency} ${data.products[i].cost}</h4>
                            <small class="text-muted">${data.products[i].soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${data.products[i].description}</p>
                    </div>
                </div>
            </div>
        `
}
}
)