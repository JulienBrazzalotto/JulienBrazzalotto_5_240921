//Afficher le prix de la commande avec le numéro de suivi(order)
"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l'avoir définie). Elle permet d'obtenir de meilleures performances et de faciliter le débogage.







function ordernumber(){

    const returnBackEnd = JSON.parse(localStorage.getItem("order"));
    console.log(returnBackEnd)
    const prixTotal = localStorage.getItem("Prixtotal");

    const confirmation = document.createElement("p");
    confirmation.classList.add("p-5","fs-5");
    confirmation.textContent = "Nous validons M. ou Mme " + returnBackEnd.contact.lastName + " votre commande de " + prixTotal + "€. Votre numéro de facture est le " + returnBackEnd.orderId + ". Nous vous remercions de votre achat.";

    document.getElementById("order").appendChild(confirmation);
}

ordernumber();