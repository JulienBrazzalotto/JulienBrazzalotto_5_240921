//Afficher le produit sélectionner dans la page index.html, choisir son option, et mettre dans le localstorage
"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l'avoir définie). Elle permet d'obtenir de meilleures performances et de faciliter le débogage.




//Permet de récupérer l'ID du produit fourni sur la page index.html
const params = new URL(document.location).searchParams; //Permet de récupérer l'URL de la page actuelle
const idProduct = params.get('id'); //permet de récupérer l'ID dans l'URL
console.log(idProduct) // Permet de voir si on récupère bien l'ID du produit




//Fonction permettant d'afficher l'article avec les différentes options de lentilles et ajout dans le localstorage des articles
async function displayFullArticle(){
    const article = await getOneArticle();
    displayOneProduct(article);
    displayLenses(article);
    addBasket(article);
}





//Créer la fonction getArticle qui récupère l'article avec l'ID récupéré dans l'URL
function getOneArticle(){
    return fetch("http://localhost:3000/api/cameras/" + idProduct)
        .then(function(response) {
            console.log(response) //Permet de voir si on récupère bien le json

            return response.json(); //transforme la réponse en json pour etre lu par le javascript
        })
        .catch(function(error) { //Envoie un message d'erreur s'il ne peut pas le récupérer dans la promise précédente
            document.getElementById('display').innerHTML = "Erreur !!! Nous ne pouvons pas récupérer le produit..."
        })
}


//Fonction permettant d'afficher l'article récupéré
function displayOneProduct(article){
    const product = document.createElement("div");
    product.classList.add("box", "mx-3", "my-3", "rounded-3", "bg-dark", "w-100", "h-100");
    

    product.innerHTML = 
        (
            '<figure><img class="picture rounded-3 w-100" src="'
            + article.imageUrl 
            + '" alt="'
            + article.name 
            + '"><figcaption class="w-100"><h2 id="nom">'
            + article.name 
            + '</h2><p class="text-white">'
            + article.description 
            + '</p><p class="my-5 text-white">Prix: ' 
            + convertPrice(article) 
            + ' €</p><label class="text-white" for="lense-select">Choisir une lentille: </label><select class="text-dark" name="lenses" id="select"></select><p><label class="text-white m-3" for="quantity">Quantité: </label><input id="qty" type="number" name="itemQuantity" min="1" max="50" value="1"></p></figcaption><button id="add" class="bg-white text-dark border border-2 border-dark rounded-pill mb-1 p-2">Ajouter au panier</button></figure>')


    document.getElementById("display").appendChild(product) //Intégration du HTML dans le DOM
}





//Convertir le prix en euros en renvoyant un format en fonction de la locale comme sur la page index.html
function convertPrice(article){
    const newPrice = article.price / 100;

    return newPrice;
}





//Fonction permettant d'afficher les lentilles
function displayLenses(article){
    for(const i in article.lenses){
        const lenseOption = document.createElement("option");
        lenseOption.setAttribute("value", article.lenses[i]);
        lenseOption.innerHTML = article.lenses[i];

        document.getElementById("select").appendChild(lenseOption);
    }    
}



//Fonction permettant d'ajouter un article au localstorage a chaque clic sur le bouton
function addBasket(article){
    const add = document.getElementById("add");
    add.addEventListener("click", function(e) {
        const eltBasket = {
            Nom: article.name,
            Lense: select.value,
            Quantity: qty.value,
            Prix: convertPrice(article),
        }
        const basket = JSON.parse(localStorage.getItem("Basket")) || []; //renvoie le JSON si vrai sinon renvoie le tableau si pas de JSON (ou logique)
        basket.push(eltBasket); 
        localStorage.setItem("Basket", JSON.stringify(basket)); 
    });
}




displayFullArticle();
