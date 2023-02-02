// Variable contenant les analogies ajoutée
var analogieperso = [];
// Appel du fichier JSON
fetch('data.json').then(function (response) {
    response.json().then(function (data) {
        // Appel de la fonction générant les analogies
        abcd(data, 'section.analogies')

        const infoanalogieperso = document.querySelector('p.formInfo');
        // Envoi à l'api après le clique sur le texte envoyer du HTML des informations entrée dans le formulaire
        infoanalogieperso.addEventListener('click', function () {
            analogieperso.push({"analogie": document.querySelector('input#analogie').value, "valeurAnalogie": document.querySelector('input#valeurAnalogie').value, "explication": document.querySelector('textarea#explication').value, "image": document.querySelector('input#image').value,"alt" : document.querySelector('input#alt').value });
            console.log(analogieperso);
            abcd(analogieperso, 'section.analogiesPerso');

            // Lien de l'API et ajout des valeurs
            const lien = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=idriss.merouane&courriel=" + document.querySelector('input#mail').value +"&message=Si j'étais " + document.querySelector('input#analogie').value + "alors je serais " + document.querySelector('input#valeurAnalogie').value + " car " + document.querySelector('textarea#explication').value + " Image proposée : " + document.querySelector('input#image').value + " avec comme texte alternatif : " + document.querySelector('input#alt').value;

            // Affichage d'un message de confirmation de réception des données
            fetch(lien).then(function(response) {
                response.json().then(function(data){
                    console.log("Réponse reçue : ")
                    console.log(data);
                    alert(data.message)
                })
              })
            // Appel de la fonction rénitialisant le formulaire après envoi
            resetForm();
        })




    })
});
// Fonction de génération des analogies
function abcd(data, cible) {
    // Bloc vierge d'analogie dans une constante
    const analogie = "<div class=\"analogie\" id=\"a{{num}}\"><h1> Si j'étais {{analogie}} je serai {{valeurAnalogie}}</h1><div class=\"text\"><p>{{explication}}</p></div><div class=\"picture\"><img src=\"{{image}}\" alt=\"{{alt}}\"></div></div>";
    const div = document.querySelector(cible);
    let text = "";
    // Ouverture d'une fonction foreach
    data.forEach(function (element) {
        // Ajout d'une nouvelle analogie avec les informations du JSON
        text += analogie;
        // Remplacement des éléments par les informations du JSON
        Object.keys(element).forEach(function (clef) {
            text = text.replaceAll("{{" + clef + "}}", element[clef]);
        })
    })
    // Écriture de l'analogie finale dans la page
    div.innerHTML = text;
};
// Fonction de remise à zéro du formulaire à la validation
function resetForm() {
    // Selection de tout les Input/textarea
    const formulaire = document.querySelectorAll('form input, form textarea');
    // Ouverture d'une fonction foreach pour les input/textarea sélectionné
    formulaire.forEach(function (entree) {
        // Mise à zéro du contenu du formulaire
        entree.value = "";
    })
};