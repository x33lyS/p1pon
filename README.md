<div align="center" id="top">
  <h1 align="center">Pinpon</h1>
</div>

## :dart: À propos ##

Ce projet est une application de simulation de déplacement de robots pompiers. Il est composé d'un backend et d'un frontend.

Le backend, situé dans le dossier [pinpon_back](pinpon_back/), est écrit en TypeScript et utilise Express pour le serveur HTTP et Sequelize pour l'interaction avec la base de données MySQL.

Le frontend, situé dans le dossier [p1pon_front](p1pon_front/), est une application Angular qui permet de visualiser et de contrôler les déplacements des robots.

## :sparkles: Prérequis ##

:heavy_check_mark: Node.js v.20.9.0 or higher;\
:heavy_check_mark: MySQL;\
:heavy_check_mark: Angular CLI 16.13 or higher;

## :rocket: Installation ##

1. Clonez le dépôt :
```bash
git clone <url-du-dépôt>
```

Installez les dépendances du backend :
```bash
cd pinpon_back
npm install
npm run start
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

Installez les dépendances du frontend :
```bash
cd p1pon_front
npm install
npm run start
```
Puis aller sur http://localhost:4200/fire
