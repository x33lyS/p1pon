<div align="center" id="top"> 
  <h1 align="center">Pinpon Back</h1>
</div>


<p align="center">
  <img alt="Github top language" src="https://img.shields.io/badge/language-TypeScript-blue?style=flat-square">
  
  <img alt="Github language count" src="https://img.shields.io/badge/languages-1-blue?style=flat-square">

  <img alt="Repository size" src="https://img.shields.io/badge/repository%20size-small-green?style=flat-square">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat-square">
</p>

## :dart: À propos ##

Ce projet est le backend de l'application Pinpon. Il est écrit en TypeScript et utilise Express pour le serveur HTTP et Sequelize pour l'interaction avec la base de données MySQL.

## :sparkles: Prérequis ##

:heavy_check_mark: Node.js;\
:heavy_check_mark: MySQL;

## :rocket: Installation ##

1. Clonez le dépôt :
```bash
git clone <url-du-dépôt>
cd pinpon_back
npm install
```

## :white_check_mark: Configuration ##
Créez un fichier .env à la racine du projet pinpon_back et ajoutez-y les variables d'environnement suivantes :

```sh
DB_NAME=pinpon
DB_USER=<utilisateur-de-la-base-de-données>
DB_PASS=<mot-de-passe-de-la-base-de-données>
DB_HOST=<hôte-de-la-base-de-données>
APP_PORT=<port-du-serveur>
```

Remplacez <utilisateur-de-la-base-de-données>, <mot-de-passe-de-la-base-de-données>, <hôte-de-la-base-de-données> et <port-du-serveur> par vos propres valeurs.

## :checkered_flag: Création de la base de données ##
Créez une base de données MySQL en utilisant le fichier de dump fourni dans le dossier dumps :

```bash
mysqldump -u <utilisateur> -p < dumps/19_02_23.sql
```

Remplacez <utilisateur> par vos propres valeurs.

## :running: Lancement du projet ##
Pour lancer le projet, exécutez la commande suivante :

```bash
npm run start
```

N'oubliez pas de remplacer <url-du-dépôt>, <utilisateur-de-la-base-de-données>, <mot-de-passe-de-la-base-de-données>, <hôte-de-la-base-de-données> et <port-du-serveur> par vos propres valeurs.

<a href="#top">Retour en haut</a>