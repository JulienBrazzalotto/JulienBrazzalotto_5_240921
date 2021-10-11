//Afficher le panier et valider la commande

"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l'avoir définie). Elle permet d'obtenir de meilleures performances et de faciliter le débogage.




const basket = JSON.parse(localStorage.getItem("Basket"));
console.log(basket)








function getLocalStorage() {
    
    let productId = []

    for (let i in basket) {
        
        const article = document.createElement("tr");
        article.classList.add("my-5");
        article.innerHTML = ('<td> '+ basket[i].Nom +' </td><td>'+ basket[i].Lense +'</td><td>'+ basket[i].Quantity +'</td><td>'+ basket[i].Prix +' €</td>');


        document.getElementById("display").appendChild(article);

        productId.push(basket[i].Id)
        localStorage.setItem("Basketid", JSON.stringify(productId))

        
    };
    console.log(productId)
}




function total(){
    let totalBasket = 0;

    for (let i = 0; i < basket.length; i++){
        totalBasket += basket[i].Prix * basket[i].Quantity;
        console.log("totalBasket #" + i + ": " + totalBasket);        
    }

    console.log("totalBasket: " + totalBasket);
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




function addAndSendContactForm(){

    const contact = document.getElementById("submit");
    contact.addEventListener("click", function(e) {
        
        const eltContact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
            
        }
        const contact = JSON.parse(localStorage.getItem("Contact")) || [];
        contact.push(eltContact); 
        localStorage.setItem("Contact", JSON.stringify(contact));




        
        const products = localStorage.getItem("Basketid")

        console.log(contact)
        console.log(products)

        fetch("http://localhost:3000/api/cameras/order", {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({contact, products})
            })


            .then(function(response){
                return response.json();
            })


            .then(function(value){
                let order = JSON.stringify(value);
                localStorage.setItem("order", order);
            })

            .catch(function(error){
                console.log(error)
            })
            
    })
    
}







total()
getLocalStorage()
clearBasket()
addAndSendContactForm()



