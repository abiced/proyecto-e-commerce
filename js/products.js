let infoCats = localStorage.getItem("catID")
let CatNames = localStorage.getItem("catName")
let info = `https://japceibal.github.io/emercado-api/cats_products/${infoCats}.json`
const priceAsc = document.getElementById("sortAsc");
const priceDesc = document.getElementById("sortDesc");
const rel = document.getElementById("rel");
let inputMin = document.getElementById("priceFilterMin");
let inputMax = document.getElementById("priceFilterMax");
let filterBtn = document.getElementById("priceFilter");
let restoreBtn = document.getElementById("clearPriceFilter");
let productsArray = [];
let productsArray2 = [];
let divContainer = document.getElementById("cars");

function setInfoID(id) {
    localStorage.setItem("InfoID", id);
    window.location = "product-info.html"
};

function showProducts(){
    let content = ""
    for(let i = 0; i < productsArray.length; i++){
        let products = productsArray[i];
        content += `
        <div onclick="setInfoID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
        `
        divContainer.innerHTML = content;
    }
}

getJSONData(info).then(function(resultObj){
    if(resultObj.status==="ok"){
        productsArray2 = resultObj.data.products
        productsArray = resultObj.data.products
        showProducts()
    }
})

priceAsc.addEventListener("click", function(){
    productsArray.sort((a,b) =>{
        if(a.cost > b.cost){return 1;}
        if(a.cost < b.cost){return -1;}
        return 0;
    })
    showProducts();
})

priceDesc.addEventListener("click", function(){
    productsArray.sort((a,b) =>{
        if(a.cost < b.cost){return 1;}
        if(a.cost > b.cost){return -1;}
        return 0;
    })
    showProducts();
})

rel.addEventListener("click", function(){
    productsArray.sort((a,b) =>{
        if(a.soldCount > b.soldCount){return -1;}
        if(a.soldCount < b.soldCount){return 1;}
        return 0;
    })
    showProducts();
})

filterBtn.addEventListener("click", function(){
    let min;
    if(inputMin.value !=="" && inputMin.value !==undefined){
        min = inputMin.value;
    }else {min =-Infinity;}

    let max;
    if(inputMax.value !=="" && inputMax.value !==undefined){
        max = inputMax.value;
    }else {max = Infinity;}
    productsArray = productsArray2.filter(product => product.cost >= min && product.cost <= max);
    showProducts();
});

restoreBtn.addEventListener("click", function(){
    productsArray = productsArray2
    showProducts();
})