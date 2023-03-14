# Project Argent Bank

## Présentation

Utiliser une API pour un compte utilisateur bancaire avec React pour la formation Openclassrooms JS React. Argent Bank est le projet numéro 13 de la formation.

Les utilisateurs d'Argent Bank peuvent créer un compte et se connecter et déconnecter au système. L'utilisateur peut voir son profil et le modifier dans la base de données.

Un proposition de modélisation de l'API du module de transaction est présentée dans ce fichier [swagger](https://github.com/SFERRER-DEV/projet-13/blob/master/swagger.yaml) (yaml).

## Architecture du projet

Ce projet a été initialisé avec [Create React App](https://github.com/facebook/create-react-app).

[Redux](https://redux.js.org/) et l'outil [Redux Toolkit](https://redux-toolkit.js.org/) gérent l'état global de l'ensemble de l'application et centralisent la logique. Les fonctions qui intéragissent avec le Store Redux sont des thunks.

## Installation et lancement du Front-end (port 3000)

Cloner le dépôt de Argent Bank Frontend : git clone https://github.com/SFERRER-DEV/projet-13.git

Dans ce référentiel Front-end, installez les dépendances avec la commande yarn install

```bash
# avec NPM
npm install
# avec Yarn
yarn install
```

Dans le répertoire du projet, vous pouvez exécuter : yarn start pour lancer l'application en mode développement.

```bash
npm run start
# ou
npm start
# avec Yarn
yarn start
```

Ouvrez http://localhost:3000 pour l'afficher dans votre navigateur.

## Installation et lancement du Backend - Argent Bank API (port 3001)

https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API

- Lire le [README](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API#readme) du backend
- Lancer le backend et un serveur de base de données [MongoDB](https://www.mongodb.com/try/download/community).

```bash
# Start local dev server
npm run dev:server

# Populate database with two users
npm run populate-db
```

## Liens

- Vue d'ensemble et résumé de la base de code avec Code Climate: [Codebase summary projet 13: Argent Bank](https://codeclimate.com/github/SFERRER-DEV/projet-13)
