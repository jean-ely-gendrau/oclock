// Appeler la fonction d'horloge chaque seconde
setInterval(afficherHeure, 1000);

// Horloge
function afficherHeure() {
  const maintenant = new Date();
  const heure = maintenant.getHours();
  const minutes = maintenant.getMinutes();
  const secondes = maintenant.getSeconds();
  const heureFormattee = `${heure.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secondes.toString().padStart(2, "0")}`;
  document.getElementById("heure").textContent = heureFormattee;
}

// Timer
let timerEnCours;
let tempsRestant;

function demarrerTimer() {
  const minutes = parseInt(document.getElementById("minutes").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Veuillez entrer un nombre de minutes valide.");
    return;
  }

  tempsRestant = minutes * 60;
  timerEnCours = setInterval(actualiserTimer, 1000);
}

function actualiserTimer() {
  const minutes = Math.floor(tempsRestant / 60);
  const secondes = tempsRestant % 60;
  const tempsFormatte = `${minutes.toString().padStart(2, "0")}:${secondes
    .toString()
    .padStart(2, "0")}`;
  document.getElementById("timer").textContent = tempsFormatte;

  if (tempsRestant === 0) {
    clearInterval(timerEnCours);
    alert("Le temps est écoulé !");
  } else {
    tempsRestant--;
  }
}

// Réveil
let reveilEnCours;

function reglerReveil() {
  console.log("Fonction reglerReveil appelée.");
  const heureReveil = document.getElementById("heureReveil").value;
  const heuresMinutes = heureReveil.split(":");
  const heure = parseInt(heuresMinutes[0]);
  const minutes = parseInt(heuresMinutes[1]);

  console.log("Heure de réveil:", heure);
  console.log("Minutes de réveil:", minutes);

  if (
    isNaN(heure) ||
    isNaN(minutes) ||
    heure < 0 ||
    heure > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    alert("Veuillez entrer une heure de réveil valide.");
    return;
  }

  const maintenant = new Date();
  const heureActuelle = maintenant.getHours();
  const minutesActuelles = maintenant.getMinutes();
  let millisecondsJusquAuReveil;

  if (
    heureReveil < heureActuelle ||
    (heureReveil === heureActuelle && minutesReveil <= minutesActuelles)
  ) {
    // Si l'heure de réveil est passée pour aujourd'hui, définir pour demain
    const demain = new Date();
    demain.setDate(demain.getDate() + 1);
    demain.setHours(heure);
    demain.setMinutes(minutes);
    millisecondsJusquAuReveil = demain - maintenant;
  } else {
    // Sinon, définir pour aujourd'hui
    const aujourdHui = new Date();
    aujourdHui.setHours(heure);
    aujourdHui.setMinutes(minutes);
    millisecondsJusquAuReveil = aujourdHui - maintenant;
  }

  console.log(
    "Temps jusqu'au réveil en millisecondes:",
    millisecondsJusquAuReveil
  );

  reveilEnCours = setTimeout(function () {
    alert("Réveil !");
  }, millisecondsJusquAuReveil);
}

let listeReveils = [];

function ajouterReveil() {
  const heureReveil = document.getElementById("heureReveil").value;
  listeReveils.push(heureReveil);
  afficherListeReveils();
}

function supprimerReveil(index) {
  listeReveils.splice(index, 1);
  afficherListeReveils();
}

function afficherListeReveils() {
  const listeReveilsElement = document.getElementById("listeReveils");
  listeReveilsElement.innerHTML = "";
  listeReveils.forEach((heure, index) => {
    const li = document.createElement("li");
    li.textContent = heure;
    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.addEventListener("click", () => supprimerReveil(index));
    li.appendChild(btnSupprimer);
    listeReveilsElement.appendChild(li);
  });
}

// Appel de la fonction d'horloge au chargement de la page
window.onload = function () {
  afficherHeure();
};

// Chronomètre
let tempsEnregistres = [];
let chronometreEnCours;
let tempsDebut;
let tempsPause = 0;
let tempsPrecedent = 0;

function actualiserChronometre() {
  const maintenant = Date.now();
  const tempsEcoule = maintenant - tempsDebut + tempsPrecedent;

  const minutes = Math.floor((tempsEcoule / 60000) % 60);
  const secondes = Math.floor((tempsEcoule / 1000) % 60);
  const millisecondes = Math.floor((tempsEcoule % 1000) / 10);
  const tempsFormatte = `${minutes.toString().padStart(2, "0")}:${secondes
    .toString()
    .padStart(2, "0")}:${millisecondes.toString().padStart(2, "0")}`;

  document.getElementById("tempsChronometre").textContent = tempsFormatte;
}

function arreterChronometre() {
  clearInterval(chronometreEnCours);
  tempsPause += Date.now() - tempsDebut;
  chronometreEnCours = null; // Réinitialiser le statut du chronomètre
  document.getElementById("enregistrerButton").disabled = true; // Désactiver le bouton "Enregistrer"
  document.getElementById("arreterButton").disabled = true; // Désactiver le bouton "Arrêter"
}

function demarrerChronometre() {
  if (!chronometreEnCours) {
    tempsDebut = Date.now() - tempsPause;
    chronometreEnCours = setInterval(actualiserChronometre, 10);
    document.getElementById("enregistrerButton").disabled = false; // Activer le bouton "Enregistrer"
    document.getElementById("arreterButton").disabled = false; // Activer le bouton "Arrêter"
  }
}

function reinitialiserChronometre() {
  clearInterval(chronometreEnCours);
  document.getElementById("tempsChronometre").textContent = "00:00:00";
  tempsEnregistres = [];
  tempsDebut = 0;
  tempsPause = 0;
  tempsPrecedent = 0;
  chronometreEnCours = null;
  document.getElementById("enregistrerButton").disabled = true; // Désactiver le bouton "Enregistrer"
  document.getElementById("arreterButton").disabled = true; // Désactiver le bouton "Arrêter"
  afficherListeTemps();
}

function enregistrerTemps() {
  const maintenant = Date.now();
  const tempsEcoule = maintenant - tempsDebut + tempsPrecedent;
  tempsEnregistres.push(tempsEcoule);
  afficherListeTemps();
}

function afficherListeTemps() {
  const listeTemps = document.getElementById("listeTemps");
  listeTemps.innerHTML = "";
  tempsEnregistres.forEach((temps, index) => {
    const tempsObjet = new Date(temps);
    const minutes = tempsObjet.getMinutes();
    const secondes = tempsObjet.getSeconds();
    const millisecondes = tempsObjet.getMilliseconds();
    const tempsFormatte = `${minutes.toString().padStart(2, "0")}:${secondes
      .toString()
      .padStart(2, "0")}.${millisecondes.toString().padStart(3, "0")}`;
    const ligneTemps = document.createElement("li");
    ligneTemps.textContent = `Temps ${index + 1}: ${tempsFormatte}`;
    listeTemps.appendChild(ligneTemps);
  });
}
