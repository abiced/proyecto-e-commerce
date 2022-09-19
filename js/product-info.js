let infoProduct = localStorage.getItem("InfoID")
let infoP = `https://japceibal.github.io/emercado-api/products/${infoProduct}.json`
let commentUrl = `https://japceibal.github.io/emercado-api/products_comments/${infoProduct}.json`
let divInformation = document.getElementById("information")
let divComments = document.getElementById("comments")
let commentArray = []
let newComment = document.getElementById("newComment")
let calificationStars = document.getElementById("scoreArea")
let commentForm = document.getElementById("commentForm")
let userName = localStorage.getItem("userEmail")
let userEmail = document.getElementById("userEmailNav")
    userEmail.innerText=userName
let textComment = {}
let time = new Date()
let newDay = new Date()
let day = newDay.getDate()
let month = newDay.getMonth()
let year = newDay.getFullYear()
let rightNow = time.getHours() + ":"+time.getMinutes()+ ":" + time.getSeconds();
    newDay = day + "-" + month + "-" + year + " ";
let localTime = newDay + rightNow

getJSONData(infoP).then(function(resultObj){
    if(resultObj.status==="ok"){
        products = resultObj.data
        console.log(products)
        function showProducts(){
            let content = ""
                content += `
                <h2>${products.name}<hr></h2>
                <h4><strong>Precio</strong></h4>
                <p>${products.currency} ${products.cost}</p>
                <h4><strong>Descripción</strong></h4>
                <p>${products.description}</p>
                <h4><strong>Categoria</strong></h4>
                <p>${products.category}</p>
                <h4><strong>Cantidad de vendidos</strong></h4>
                <p>${products.soldCount}</p>
                <h4><strong>Imagenes ilustrativas</strong></h4>
                <div id="productImages">
                <img src="${products.images[0]}">
                <img src="${products.images[1]}">
                <img src="${products.images[2]}">
                <img src="${products.images[3]}">
                </div>
                `
                divInformation.innerHTML = content;
            }
        }
        showProducts()
    }
)


getJSONData(commentUrl).then(function(resultObj){
    if(resultObj.status==="ok"){
        commentArray = resultObj.data
        console.log(commentArray)
        function showComments(){
            let content = ""
            content += `
                <h3><strong>Comentarios</strong></h3>
                `
            for(let i = 0; i < commentArray.length; i++){
            comment = commentArray[i]
            let score = ""
            for (let i = 1; i <= comment.score; i++){
                score += `<span class="fa fa-star checked"></span>`
            }
            for (let i = 1; i <= 5 - comment.score; i++){
                score += `<span class="fa fa-star"></span>`
            }
                content += `
                <li id="commentList">
                <ul id="commentListUl">
                <span id="userBlack">${comment.user}</span> - ${comment.dateTime} - ${score}
                <br>
                ${comment.description}
                </ul>
                </li>
                `
                divComments.innerHTML = content;
        }
        }
        showComments()
        document.getElementById("btnSubmit").addEventListener("click", function(e){
            if(newComment.value === ""){
                e.preventDefault();
            }else {
                textComment.user = localStorage.getItem("userEmail")
                console.log(textComment.user)
                textComment.score = calificationStars.value
                textComment.description = newComment.value
                textComment.dateTime = localTime
                commentArray.push(textComment)
                e.preventDefault()
                showComments()
            }
        })
    }
});