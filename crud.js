const mongoose = require('mongoose');

// Connexion à la base de donnée MongoDB
mongoose.connect('mongodb://localhost:27017/gameforge', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Initialisation des collections
const Competence = mongoose.model('competences', new mongoose.Schema({
  nom: String,
}));

const Objet = mongoose.model('objets', new mongoose.Schema({
  nom: String,
}));

const Joueur = mongoose.model('joueurs', new mongoose.Schema({
  pseudo: String,
  classe: String,
  niveau: Number,
  competences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'competences' }],
  inventaire: [{ type: mongoose.Schema.Types.ObjectId, ref: 'objets' }],
  date_connexion: { type: Date, default: Date.now }
}));

// Fonctions CRUD pour les compétences

// Creation Competence
async function creerCompetence() {
  const competence = new Competence({ nom: "Force"});
  await competence.save();
  console.log("Compétence créée :", competence);
}

// Affichage de toutes les Competences
async function lireCompetences() {
  const competences = await Competence.find();
  console.log("Liste des compétences :", competences);
}

// Modification Competence
async function mettreAJourCompetence(id) {
  const competence = await Competence.findByIdAndUpdate(id, { nom: "Nouvelle competence" }, { new: true });
  console.log("Compétence mise à jour :", competence);
}

// Suppression Competence
async function supprimerCompetence(id) {
  await Competence.findByIdAndDelete(id);
  console.log("Compétence supprimée.");
}

// Fonctions CRUD pour les objets

// Creation Objet
async function creerObjet() {
  const objet = new Objet({ nom: "Épée"});
  await objet.save();
  console.log("Objet créé :", objet);
}

// Affichage de tout les Objets
async function lireObjets() {
  const objets = await Objet.find();
  console.log("Liste des objets :", objets);
}

// Modification Objet
async function mettreAJourObjet(id) {
  const objet = await Objet.findByIdAndUpdate(id, { nom: "Bouclier" }, { new: true });
  console.log("Objet mis à jour :", objet);
}

// Suppression Objet
async function supprimerObjet(id) {
  await Objet.findByIdAndDelete(id);
  console.log("Objet supprimé.");
}

// Fonctions CRUD pour les joueurs

// Creation Joueur
async function creerJoueur() {
  const joueur = new Joueur({
    pseudo: "Test",
    classe: "Guerrier",
    niveau: 78,
    competences: [],
    inventaire: []
  });
  await joueur.save();
  console.log("Joueur créé :", joueur);
}

// Affichage de tout les Joueurs
async function lireJoueurs() {
  const joueurs = await Joueur.find().populate('competences').populate('inventaire');
  console.log("Liste des joueurs avec compétences et inventaire :", joueurs);
}

// Modification Joueur
async function mettreAJourJoueur(id) {
  const joueur = await Joueur.findByIdAndUpdate(id, { niveau: 10 }, { new: true });
  console.log("Joueur mis à jour :", joueur);
}

// Suppression Joueur
async function supprimerJoueur(id) {
  await Joueur.findByIdAndDelete(id);
  console.log("Joueur supprimé.");
}

// Choix de l'opération en ligne de commande
const operation = process.argv[2];
const id = process.argv[3];

switch (operation) {
  case 'createCompetence':
    creerCompetence().then(() => mongoose.disconnect());
    break;
  case 'readCompetences':
    lireCompetences().then(() => mongoose.disconnect());
    break;
  case 'updateCompetence':
    mettreAJourCompetence(id).then(() => mongoose.disconnect());
    break;
  case 'deleteCompetence':
    supprimerCompetence(id).then(() => mongoose.disconnect());
    break;
  
  case 'createObjet':
    creerObjet().then(() => mongoose.disconnect());
    break;
  case 'readObjets':
    lireObjets().then(() => mongoose.disconnect());
    break;
  case 'updateObjet':
    mettreAJourObjet(id).then(() => mongoose.disconnect());
    break;
  case 'deleteObjet':
    supprimerObjet(id).then(() => mongoose.disconnect());
    break;
  
  case 'createJoueur':
    creerJoueur().then(() => mongoose.disconnect());
    break;
  case 'readJoueurs':
    lireJoueurs().then(() => mongoose.disconnect());
    break;
  case 'updateJoueur':
    mettreAJourJoueur(id).then(() => mongoose.disconnect());
    break;
  case 'deleteJoueur':
    supprimerJoueur(id).then(() => mongoose.disconnect());
    break;
  
  default:
    console.log("Operation non valide");
    mongoose.disconnect();
}
