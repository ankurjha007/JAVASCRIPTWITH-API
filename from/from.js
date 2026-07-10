document.getElementById("btn").addEventListener("click", saveData);

function saveData(){

    const userData = {

        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        contact: document.getElementById("contact").value

    };

    localStorage.setItem("userData", JSON.stringify(userData));

}

function displayData(){

    const myform = JSON.parse(localStorage.getItem("userData"));

    if(!myform){
        return;
    }

    document.querySelector(".card").style.display="block";

    document.getElementById("dName").innerText=myform.name;
    document.getElementById("dEmail").innerText=myform.email;
    document.getElementById("dPhone").innerText=myform.contact;
    document.getElementById("dAddress").innerText=myform.address;

}