function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}
let loginValidation = document.getElementById("loginButton")
loginValidation.addEventListener( "click", function(event){
    let emailValidation = document.getElementById("email").value
    let passwordValidation = document.getElementById("password").value
    if ( emailValidation.length>0 && passwordValidation.length>0 ){
        event.preventDefault()
        window.location.href = "home.html"
    } else {
        event.preventDefault()
        showAlertError()
    }
});