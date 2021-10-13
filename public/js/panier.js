//Afficher le panier et valider la commande

"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l'avoir définie). Elle permet d'obtenir de meilleures performances et de faciliter le débogage.



const basket = JSON.parse(localStorage.getItem("Basket"));
console.log(basket)

let productsId = []



function getLocalStorage() {
    

    for (let i in basket) {
        
        const article = document.createElement("tr");
        article.classList.add("my-5");
        article.innerHTML = ('<td> '+ basket[i].Nom +' </td><td>'+ basket[i].Lense +'</td><td>'+ basket[i].Quantity +'</td><td>'+ basket[i].Prix +' €</td>');


        document.getElementById("display").appendChild(article);

        productsId.push(basket[i].Id)
        localStorage.setItem("Basketid", JSON.stringify(productsId))

        
    };
    console.log(productsId)
}


function total(){
    let totalBasket = 0;

    for (let i = 0; i < basket.length; i++){
        totalBasket += basket[i].Prix * basket[i].Quantity;
        console.log("totalBasket #" + i + ": " + totalBasket);        
    }

    console.log("totalBasket: " + totalBasket);
    localStorage.setItem("Prixtotal", totalBasket)
    document.getElementById("total").innerHTML = totalBasket + ' €'
}


function clearBasket(){
    
    if(localStorage !=0){
        let button = document.createElement("p");
        button.classList.add("mb-5");
        button.innerHTML = ('<a class="bg-dark text-white rounded-pill p-2">vider le panier</a>');

        
        button.addEventListener('click', function(e){
            
            localStorage.clear();
            location.reload();
        })

        document.getElementById("clear").appendChild(button);
    }
}


function addandsendContactForm(){

    const eventContact = document.getElementById("submit");
    eventContact.addEventListener("click", function(e) {
        e.preventDefault();

        let contact = { //permet de créer un objet avec les éléments ci-dessous
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
            
        }
        
        let products = productsId

        console.log(contact) //permet de vérifier l'objet contact avant l'envoi
        console.log(productsId) //permet de vérifier le tableau d'ID avant l'envoi


        fetch("http://localhost:3000/api/cameras/order", {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({contact, products})
            })

        .then(function(response){
            console.log(response)
            return response.json();
            
        })

        .then(function(value){
            let order = JSON.stringify(value);
            localStorage.setItem("order", order);
            document.location.href = 'confirmation.html'
            localStorage.removeItem('Basket')
        })
    })
} 


getLocalStorage()
total()
clearBasket()
addandsendContactForm()



