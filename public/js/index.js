//Afficher tout les produits sur la page index.html

main()

async function main() {
    //Récuperer les articles avec une fonction
    const articles = await getArticles()
    //Afficher tous les articles avec une fonction qui parcoure chaque article récupéré précédemment 
    for (article of articles) 
        displayArticle(article)
}


//Créer la fonction getArticles qui récupère les articles
function getArticles() {
    return fetch("http://localhost:3000/api/cameras")//Aller a cette URL pour récupérer les produits
        .then(function(response) {
            console.log(response)
            return response.json(); //transforme la réponse en json pour etre lu par le javascript
        })
        .catch(function(error) { //Envoie un message d'erreur s'il ne peut pas le récupérer dans la promise précédente
            document.getElementById('display').innerHTML = "Erreur !!! Nous ne pouvons pas récupérer vos produits..."
        })
}      //en mettant le return au niveau du fetch nous devons mettre la fonction sur await car nous avons une promesse faite après


//Créer la fonction displayArticle pour chaque article 
function displayArticle(article) {
    const templateElt = document.getElementById("template") //récupérer le template HTML
    const cloneElt = document.importNode(templateElt.content, true) //Cloner le template

    //Change chaque élément
    cloneElt.getElementById("image").src = article.imageUrl
    cloneElt.getElementById("image").alt = article.name
    cloneElt.getElementById("title").textContent = article.name
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("price").textContent = convertprice()

    document.getElementById("display").appendChild(cloneElt) //Intégration du template au HTML
}

//Créer le prix en euros en renvoyant un format en fonction de la locale
function convertprice(){
    const newPrice = article.price / 100
    return Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(newPrice);
}