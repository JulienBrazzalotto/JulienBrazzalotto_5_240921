//Afficher tous les produits sur la page index.html
"use strict"; // Une variante plus restreinte de JavaScript (par exemple, on ne peut pas utiliser de variable avant de l"avoir définie). Elle permet d"obtenir de meilleures performances et de faciliter le débogage.


//Récupérer les articles avec une fonction
async function displayAllArticles() {
    const articles = await getAllArticles() //articles est le json récupéré sur l"API
    console.log(articles)
    
    for (let article of articles) //Afficher avec la boucle for...of tous les articles (un par un)
        displayArticle(article) //Fonction afficher un article
}


//Créer la fonction getArticles qui récupère les articles
function getAllArticles() {

    return fetch("http://localhost:3000/api/cameras/")//Aller a cette URL pour récupérer les produits
        .then(function(response) {
            console.log(response) //Permet de voir si on récupère bien le json

            return response.json(); //transforme la réponse en json pour être lu par le javascript
        })
        .catch(function(error) { //Envoie un message d"erreur s"il ne peut pas le récupérer dans la promise précédente
            document.getElementById("display").innerHTML = "Erreur !!! Nous ne pouvons pas récupérer vos produits..."
        })
}      //en mettant le return au niveau du fetch nous devons mettre la fonction sur await car nous avons une promesse faite après


//Créer la fonction displayArticle pour chaque article 
function displayArticle(article) {
    const product = document.createElement("div"); //Créer une div
    product.classList.add("hover", "mx-3","my-3", "box", "rounded-3", "bg-dark", "w-100","h-100"); // Ajouter les classes pour le CSS

    product.innerHTML = 
        (
            '<a class="text-white" href="./views/produit.html?id=' 
            + article._id 
            + '"><figure><img class="picture rounded-3 w-100" src="'
            + article.imageUrl 
            + '" alt="'
            + article.name 
            + '"><figcaption class="w-100"><h2>' 
            + article.name 
            + '</h2><p class="text-white">'
            + article.description 
            + '</p><p class="my-5 text-white">Prix: '
            + convertPrice(article) 
            + '</p></figcaption><p>Découvrez ce modèle</p></figure></a>'
        );

    document.getElementById("display").appendChild(product) //Intégration du HTML dans le DOM
}

//Convertir le prix en euros en renvoyant un format en fonction de la locale
function convertPrice(article){
    const newPrice = article.price / 100
    console.log(newPrice)

    return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(newPrice);
}

/********************************appel de la fonction*********************/

displayAllArticles(); //appel de la fonction principale
