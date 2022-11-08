let cartExample = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let myCart = document.getElementById("divCart")
let normalUnitcost = []
let changedUnitcost = []
let costCard = document.getElementById("costCard")
let shopAlert = document.getElementById("shopAlert")

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
            <input id="form1" min="1" name="cantidad" value="1" type="number" required/>
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
            <p>Costo unitario del producto por cantidad <span class="costRight">${cartArticle.currency} <span id="spanChangedUnitCost2">${changedUnitcost}</span></span></p>
            </li>
            <li class="list-group-item">
            <h6>Costo de envio</h6>
            <p>Segun el tipo de envio <span class="costRight">${cartArticle.currency} <span id="spanCost"></span></span></p>
            </li>
            <li class="list-group-item">
            <h6>Total</h6><p>Total a pagar <span id="pSpanTotal">${cartArticle.currency} <span id="spanTotal"></span></span></p>
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
let creditCardNumber = document.getElementById("creditCardNumber")
let accountNum = document.getElementById("accountNum")
let securityCode = document.getElementById("securityCode")
let expDate = document.getElementById("expDate")

modalForm.addEventListener("input", function() {
    if (creditCard.checked && creditCardNumber.value == 0 && securityCode.value == 0 && expDate.value == 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.removeAttribute("hidden")
        invalidForm2.removeAttribute("hidden")
        invalidForm3.removeAttribute("hidden")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (creditCard.checked && creditCardNumber.value !== 0 && securityCode.value == 0 && expDate.value == 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.setAttribute("hidden", "")
        invalidForm2.removeAttribute("hidden")
        invalidForm3.removeAttribute("hidden")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (creditCard.checked && creditCardNumber.value == 0 && securityCode.value !== 0 && expDate.value == 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.removeAttribute("hidden")
        invalidForm2.setAttribute("hidden", "")
        invalidForm3.removeAttribute("hidden")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (creditCard.checked && creditCardNumber.value == 0 && securityCode.value == 0 && expDate.value !== 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.removeAttribute("hidden")
        invalidForm2.removeAttribute("hidden")
        invalidForm3.setAttribute("hidden", "")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (creditCard.checked && creditCardNumber.value !== 0 && securityCode.value !== 0 && expDate.value == 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.setAttribute("hidden", "")
        invalidForm2.setAttribute("hidden", "")
        invalidForm3.removeAttribute("hidden")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (creditCard.checked && creditCardNumber.value == 0 && securityCode.value !== 0 && expDate.value !== 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.removeAttribute("hidden")
        invalidForm2.setAttribute("hidden", "")
        invalidForm3.setAttribute("hidden", "")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (creditCard.checked && creditCardNumber.value !== 0 && securityCode.value == 0 && expDate.value !== 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.setAttribute("hidden", "")
        invalidForm2.removeAttribute("hidden")
        invalidForm3.setAttribute("hidden", "")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (creditCard.checked && creditCardNumber.value !== 0 && securityCode.value !== 0 && expDate.value !== 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.setAttribute("hidden", "")
        invalidForm2.setAttribute("hidden", "")
        invalidForm3.setAttribute("hidden", "")
        accountNum.disabled = true
        creditCardNumber.disabled = false
        securityCode.disabled = false
        expDate.disabled = false
    } else if (bankTransfer.checked && accountNum.value == 0) {
        invalidForm4.removeAttribute("hidden")
        invalidForm1.setAttribute("hidden", "")
        invalidForm2.setAttribute("hidden", "")
        invalidForm3.setAttribute("hidden", "")
        creditCardNumber.disabled = true
        securityCode.disabled = true
        expDate.disabled = true
        accountNum.disabled = false
    } else if (bankTransfer.checked && accountNum.value !== 0) {
        invalidForm4.setAttribute("hidden", "")
        invalidForm1.setAttribute("hidden", "")
        invalidForm2.setAttribute("hidden", "")
        invalidForm3.setAttribute("hidden", "")
        creditCardNumber.disabled = true
        securityCode.disabled = true
        expDate.disabled = true
        accountNum.disabled = false
    }
});

(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else if (form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            shopAlert.removeAttribute("hidden")
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()