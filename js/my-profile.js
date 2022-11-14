function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", () => {
      preview.src = reader.result;
      localStorage.setItem("profilePic", preview.src);
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

let fields = document.querySelectorAll('input')
function saveData() {
  localStorage.setItem("profileName", fields[0].value)
  localStorage.setItem("profileSecondName", fields[1].value)
  localStorage.setItem("profileLastname", fields[2].value)
  localStorage.setItem("profileSecondLastname", fields[3].value)
  localStorage.setItem("profileTelephone", fields[5].value)
  localStorage.setItem("profilePic", profilePictureView.src);
}
function dataSaved() {
  if (localStorage.getItem("userEmail") !== null) {
    fields[0].value = localStorage.getItem("profileName")
    fields[1].value = localStorage.getItem("profileSecondName")
    fields[2].value = localStorage.getItem("profileLastname")
    fields[3].value = localStorage.getItem("profileSecondLastname")
    document.getElementById("profileEmail").value = localStorage.getItem("userEmail");
    fields[5].value = localStorage.getItem("profileTelephone")
    let src = localStorage.getItem("profilePic");
    if (src) profilePictureView.src = src;
  } else {
  }
}
dataSaved();


(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
        saveData()
      }, false)
    })
})();

function myProfileLogin() {
  if (localStorage.getItem("userEmail") == null) {
    window.location.replace("index.html")
  } else {
  }
}
myProfileLogin()