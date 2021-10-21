//Afficher le prix de la commande avec le numéro de suivi(order)
"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l"avoir définie). Elle permet d"obtenir de meilleures performances et de faciliter le débogage.


//fonction permettant d"afficher le numéro de facture
function displayOrderNumber(){

    const returnBackEnd = JSON.parse(localStorage.getItem("order")); //Je crée une variable contenant le localStorage de la clé "order" sous forme d"objet
    console.log(returnBackEnd)
    const prixTotal = localStorage.getItem("Prixtotal"); //Je crée une variable contenant le prixtotal stocké dans la page panier

    const confirmation = document.getElementById("order").innerHTML =
        (
            '<p class="p-5 fs-5">Nous validons M. ou Mme <b>'
            + returnBackEnd.contact.lastName 
            +'</b> votre commande de <b>'
            + prixTotal
            +' €</b>.<br> Votre numéro de facture est le <b>'
            + returnBackEnd.orderId
            +'</b>.<br> Nous vous remercions de votre achat.</p>')
    
    localStorage.clear()
}

displayOrderNumber();

