<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projet O'Clock</title>
  <link rel="stylesheet" href="./styles.css">
</head>

<body>
  <header>
    <nav>
      <ul>
        <li><a href="#horloge">Horloge</a></li>
        <li><a href="#timer">Timer</a></li>
        <li><a href="#reveil">Réveil</a></li>
        <li><a href="#chronometre">Chronomètre</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="horloge">
      <h2>Horloge</h2>
      <div id="heure">Chargement de l'heure...</div>
    </section>

    <section id="timer">
      <h2>Timer</h2>
      <div>
        Timer :
        <input type="number" id="minutes" placeholder="Minutes">
        <button onclick="demarrerTimer()">Démarrer</button>
        <div id="timerDisplay">00:00</div>
      </div>
    </section>

    <section id="reveil">
      <h2>Réveil</h2>
      <div>
        Réveil :
        <input type="time" id="heureReveil" step="60">
        <button onclick="ajouterReveil()">Ajouter</button>
      </div>
      <h3>Liste des réveils</h3>
      <ul id="listeReveils"></ul>
    </section>

    <section id="chronometre">
      <h2>Chronomètre</h2>
      <div>
        Chronomètre :
        <div id="tempsChronometre">00:00:00</div>
        <button onclick="demarrerChronometre()">Démarrer</button>
        <button id="arreterButton" onclick="arreterChronometre()" disabled>Arrêter</button>
        <button onclick="reinitialiserChronometre()">Réinitialiser</button>
        <button id="enregistrerButton" onclick="enregistrerTemps()">Enregistrer</button>
      </div>
      <h3>Liste des temps enregistrés</h3>
      <ul id="listeTemps"></ul>
    </section>
  </main>

  <footer>
    <!-- Pied de page si nécessaire -->
  </footer>

  <script src="./script.js"></script>
</body>

</html>