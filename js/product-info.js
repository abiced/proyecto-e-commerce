let infoProduct = localStorage.getItem("InfoID")
let infoP = `https://japceibal.github.io/emercado-api/products/${infoProduct}.json`
let commentUrl = `https://japceibal.github.io/emercado-api/products_comments/${infoProduct}.json`
let divInformation = document.getElementById("information")
let divComments = document.getElementById("comments")
let divRelated = document.getElementById("productsRelated")
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
                <h2>${products.name}</h2><hr>
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
                    <div id="carouselExampleControls" class="carousel slide carousel-dark" data-bs-ride="carousel">
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${products.images[0]}" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="${products.images[1]}" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="${products.images[2]}" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="${products.images[3]}" class="d-block w-100">
                        </div>
                    </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                `
                divInformation.innerHTML = content;
            }
            function showRelated(){
                relP = products.relatedProducts
                let contentRelated = ""
                console.log(relP)
                    contentRelated += `
                    <h4>Productos relacionados</h4>
                    <div id="divRelatedProducts">
                        <div onclick="setInfoID(${relP[0].id})" class="card" style="width: 18rem;">
                            <img src="${relP[0].image}" class="card-img-top" alt="${relP[0].name}">
                        <div class="card-body">
                            <p class="card-text">${relP[0].name}</p>
                        </div>
                        </div>
                        <div onclick="setInfoID(${relP[1].id})" class="card" style="width: 18rem;">
                            <img src="${relP[1].image}" class="card-img-top" alt="${relP[1].name}">
                        <div class="card-body">
                            <p class="card-text">${relP[1].name}</p>
                        </div>
                        </div>
                    </div>
                    <hr>
                    `
                    divRelated.innerHTML = contentRelated;
                }
        showProducts()
        showRelated()
    }
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