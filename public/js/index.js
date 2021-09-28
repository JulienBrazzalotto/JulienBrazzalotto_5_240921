//Afficher tout les produits sur la page index.html

main()

async function main() {
    //Récuperer les articles avec une fonction
    const articles = await getArticles()
    //Afficher tous les articles avec une fonction qui parcourt chaque article 
    for (article of articles) 
        displayArticle(article)
}


//Créer la fonction getArticles qui récupère les articles
function getArticles() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(response) {
            return response.json();
        })
        .then(function(articles) { //vérifier que l'on récupère bien le json avec un console.log(articles) au lieu de return articles
            return articles
        })
        .catch(function(error) { //Envoie un message d'erreur s'il ne peut pas le récupérer
            alert(error)
        })
}      

//Créer la fonction displayArticle pour chaque article 
function displayArticle(article) {
    const templateElt = document.getElementById("template")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("image").src = article.imageUrl
    cloneElt.getElementById("image").alt = article.name
    cloneElt.getElementById("title").textContent = article.name
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("price").textContent = convertprice()

    document.getElementById("display").appendChild(cloneElt)
}

//Créer le prix en euros en renvoyant un format en fonction de la locale
function convertprice(){
    const newPrice = article.price / 100
    return Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(newPrice);
}