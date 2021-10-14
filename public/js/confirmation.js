//Afficher le prix de la commande avec le numéro de suivi(order)
"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l'avoir définie). Elle permet d'obtenir de meilleures performances et de faciliter le débogage.






//fonction permettant d'afficher le numéro de facture
function displayOrderNumber(){

    const returnBackEnd = JSON.parse(localStorage.getItem("order")); //Je crée une variable contenant le localstorage de la clé "order" sous forme d'objet
    console.log(returnBackEnd)
    const prixTotal = localStorage.getItem("Prixtotal"); //Je crée une variable contenant le prixtotal stocké dans la page panier

    const confirmation = document.createElement("p"); //Je crée un paragraphe
    confirmation.classList.add("p-5","fs-5"); // Contenant ces class
    confirmation.textContent = "Nous validons M. ou Mme " + returnBackEnd.contact.lastName + " votre commande de " + prixTotal + "€. Votre numéro de facture est le " + returnBackEnd.orderId + ". Nous vous remercions de votre achat.";

    document.getElementById("order").appendChild(confirmation); //Je l'intègre
}

displayOrderNumber();