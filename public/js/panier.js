//Afficher le panier et valider la commande

"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l'avoir définie). Elle permet d'obtenir de meilleures performances et de faciliter le débogage.



const basket = JSON.parse(localStorage.getItem("Basket"));
console.log(basket)


function getLine() {
    for (let i in basket) {
         const article = document.createElement("tr");
         article.classList.add("my-5");
         article.innerHTML = ('<td> '+ basket[i].Nom +' </td><td>'+ basket[i].Lense +'</td><td>'+ basket[i].Quantity +'</td><td>'+ basket[i].Prix +'</td>');

         document.getElementById("display").appendChild(article);
    };
}

function total(){
    for (let i in basket){
        let totalBasket = 0;
        totalBasket = totalBasket + basket[i].Prix;
        console.log(totalBasket)

        
    }
    
}


total()
getLine();

