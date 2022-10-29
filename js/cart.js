let cartExample = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let myCart = document.getElementById("divCart")
let normalUnitcost = []
let changedUnitcost = []

fetch(cartExample)
.then(response => response.json())
.then(data => {
    cartArticle = data.articles[0]
    console.log(cartArticle)
    normalUnitcost = cartArticle.unitCost
    changedUnitcost = cartArticle.unitCost
    content = ""
    content +=`<div class="container">
    <h2>Carrito de compras</h2>
    <div class="card" id="cartCard">
        <div class="card-header">
        <h4 id="cartTitle">Articulos a comprar</h4>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <div class="row">
            <div class="col-sm-2">
            <img src="${cartArticle.image}" id="cartImage">
            </div>
            <div class="col-sm-2">
            <p class="titles">Nombre</p>
            <p>${cartArticle.name}</p>
            </div>
            <div class="col-sm-2">
            <p class="titles">Costo</p>
            <p>${cartArticle.currency} ${normalUnitcost}</p>
            </div>
            <div class="col-sm-2">
            <p class="titles">Cantidad</p>
            <input id="form1" min="1" name="cantidad" value="1" type="number"/>
            </div>
            <div class="col-sm-2 titles">
            <p id="subt">Subtotal</p>
            <p>${cartArticle.currency} <span id="spanChangedUnitCost">${changedUnitcost}</span></p>
            </div>
            </div>
            </li>
        </ul>
    </div>
    </div>
    `
    myCart.innerHTML = content;
    let quantity = document.getElementById("form1")
    quantity.addEventListener('input', function() {
        document.getElementById("spanChangedUnitCost").innerHTML= quantity.value * normalUnitcost
      });
})