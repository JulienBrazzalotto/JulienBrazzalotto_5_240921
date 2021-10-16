//Afficher le panier et valider la commande

"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l'avoir définie). Elle permet d'obtenir de meilleures performances et de faciliter le débogage.



const basket = JSON.parse(localStorage.getItem("Basket")); //récupère le localstorage clé "Basket"
console.log(basket)

let productsId = [] //Je crée un tableau d'ID produits





// Fonction permettant d'afficher le tableau 
function displayLocalStorage() {
    
    for (let i in basket) { //Pour chaque élément présent dans le localStorage de la clé "basket"
        const article = document.createElement("tr"); //Je crée une ligne de tableau
        article.classList.add("my-5"); 
        article.innerHTML = ('<td> '+ basket[i].Nom +' </td><td>'+ basket[i].Lense +'</td><td>'+ basket[i].Quantity +'</td><td>'+ basket[i].Prix +' €</td>');


        document.getElementById("display").appendChild(article); //je l'intégre

        productsId.push(basket[i].Id) //Je met dans le tableau productId son id pour la suite
        localStorage.setItem("Basketid", JSON.stringify(productsId)) //Je l'écris sur le localstorage avec la clé Basketid
        
    };
    console.log(productsId)
}





//Fonction permettant de crée un total de la commande
function total(){
    let totalBasket = 0; //j'initialise la variable a 0(nombre)

    for (let i = 0; i < basket.length; i++){ //Pour chaque élément présent dans le localStorage de la clé "basket"
        totalBasket += basket[i].Prix * basket[i].Quantity; //J'incrément avec la somme du prix multiplié avec la quantité
        console.log("totalBasket #" + i + ": " + totalBasket);        
    }

    console.log("totalBasket: " + totalBasket);
    localStorage.setItem("Prixtotal", totalBasket) //Je l'écris sur le localstorage avec la clé "Prixtotal"
    document.getElementById("total").innerHTML = totalBasket + ' €'; //je l'intègre
}




//Fontion permettant de vider le panier
function clearBasket(){
    
    if(localStorage !=0){ //si le localstorage est rempli 
        let button = document.createElement("p"); //Je crée un paragraphe
        button.classList.add("mb-5"); //Avec cette classe
        button.innerHTML = ('<button class="bg-dark text-white rounded-pill p-2">vider le panier</button>'); //et ce bouton

        
        button.addEventListener('click', function(e){ //Lorsque j'y clique dessus 
            
            localStorage.clear(); //J'efface le localstorage en entier
            location.reload(); //et je remet le panier a jour en rechargeant ce dernier
        })

        document.getElementById("clear").appendChild(button); //Je l'intègre
    }
}




//Fonction permettant de créer l'objet contact pour l'envoi a l'API avec le tableau productId
function addAndSendContactForm(){

    const eventContact = document.getElementById("submit"); //Je pointe sur le bouton
    eventContact.addEventListener("click", function(e) { //Lorsque j'y clique
        e.preventDefault();

        let contact = { //Permet de créer un objet avec les éléments ci-dessous
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
            
        }
        
        let products = productsId //Je crée une variable contenant le tableau

        console.log(contact) //permet de vérifier l'objet contact avant l'envoi
        console.log(products) //permet de vérifier le tableau d'ID avant l'envoi


        fetch("http://localhost:3000/api/cameras/order", { //envoi a l'API via cette adresse

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({contact, products}) //de ce contenu (un objet contenant un objet contact et un tableau d'id)
            })

        .then(function(response){
            console.log(response)
            return response.json(); //transforme la réponse en json pour etre lu par le javascript
            
        })

        .then(function(value){
            const order = JSON.stringify(value); //Je crée une variable en le transformant en une chaine json
            localStorage.setItem("order", order); //Je la mets dans le localstorage avec la clé "order"
            document.location.href = 'confirmation.html' //Je me redirige vers la page confirmation.html
            localStorage.removeItem("Basket") // J'efface sur le localstorage la clé "Basket"
        })
    })
} 


displayLocalStorage()
total()
clearBasket()
addAndSendContactForm()



