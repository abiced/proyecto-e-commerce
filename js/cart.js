let cartExample = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let myCart = document.getElementById("divCart")
let normalUnitcost = []
let changedUnitcost = []
let costCard = document.getElementById("costCard")

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
    contentCost = ""
    contentCost = `<h4>Costos</h4>
    <div class="card">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <h6>Subtotal</h6>
            <p>Costo unitario del producto por cantidad</p>
            <p>${cartArticle.currency} <span id="spanChangedUnitCost2">${changedUnitcost}</span></p>
            </li>
            <li class="list-group-item">
            <h6>Costo de envio</h6>
            <p>Segun el tipo de envio</p>
            <p>${cartArticle.currency} <span id="spanCost"></span></p>
            </li>
            <li class="list-group-item">
            <h6>Total</h6>
            <p id="pSpanTotal">${cartArticle.currency} <span id="spanTotal"></span></p>
            </li>
        </ul>
    </div>
    `
    costCard.innerHTML = contentCost;
    quantity.addEventListener('input', function() {
        document.getElementById("spanChangedUnitCost2").innerHTML= quantity.value * normalUnitcost
      });
    premium.addEventListener('input', function() {
        document.getElementById("spanCost").innerHTML= normalUnitcost * quantity.value * 0.15
    });
    express.addEventListener('input', function() {
        document.getElementById("spanCost").innerHTML= normalUnitcost * quantity.value * 0.07
    });
    standard.addEventListener('input', function() {
        document.getElementById("spanCost").innerHTML= normalUnitcost * quantity.value * 0.05
    });
    premium.addEventListener('input', function() {
        document.getElementById("spanTotal").innerHTML= (quantity.value * normalUnitcost) + (normalUnitcost * quantity.value * 0.15)
    });
    express.addEventListener('input', function() {
        document.getElementById("spanTotal").innerHTML= (quantity.value * normalUnitcost) + (normalUnitcost * quantity.value * 0.07)
    });
    standard.addEventListener('input', function() {
        document.getElementById("spanTotal").innerHTML= (quantity.value * normalUnitcost) + (normalUnitcost * quantity.value * 0.05)
    });
})

let modalDescription = document.getElementById("modalDescription");
let closeModal = document.getElementById("btnCloseModal");
closeModal.addEventListener("click", function() {
    if (creditCard.checked) {
        modalDescription.innerHTML = `Metodo de pago seleccionado: <span class="FontSpan">Tarjeta de credito</span>`
    } else {
        modalDescription.innerHTML = `Metodo de pago seleccionado: <span class="FontSpan">Cuenta bancaria</span>`
    }
})
let modalForm = document.getElementById("modalRadios");
modalForm.addEventListener("input", function() {
    if (creditCard.checked) {
        document.getElementById("accountNum").disabled = true
        document.getElementById("creditCardNumber").disabled = false
        document.getElementById("securityCode").disabled = false
        document.getElementById("expDate").disabled = false
    } else {
        document.getElementById("creditCardNumber").disabled = true
        document.getElementById("securityCode").disabled = true
        document.getElementById("expDate").disabled = true
        document.getElementById("accountNum").disabled = false
    }
})