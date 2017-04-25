# NodeJS, ExpressJS & MongoDb Quickstart
Application permettant d'initialiser un server NodeJS utilisant ExpressJS pour la gestion des vues. Les téchnologies suivantes sont utilisées :
- [MongoDb](https://www.mongodb.com/)
- [ExpressJs](http://expressjs.com/fr/)
- [NodeJS](https://nodejs.org/en/)
- [NodeMon](https://nodemon.io/)

Cette application utilise des versions récentes (avril 2017) des différents frameworks, vous devez les installer ou les mettre à jour pour utiliser ce projet.
<br/><br/><br/>


## Installation

Cloner ce repo, installer les dépendances et créer un dossier `data` :
```
git clone git@github.com:DWS-paris/QUICKSTARTnodejs-expressjs-mongodb.git myNodeMongoServer
cd myNodeMongoServer
npm install && mkdir data
```
<br/>

Installer MongoDb (Linux), définir l'adresse du serveur de bases de données et lancer le server de bases de données :
```
sudo npm install mongodb -g
mongod --dbpath /path/to/myNodeMongoServer/data
mongod
```
<br/>

> Le serveur de bases de données doit toujours rester actif.

<br/>

Ouvrir une nouvelle fenêtre du terminal pour lancer le shell MongoDb, créer une base de données `task` et ajouter des documents dans une collection nommée `list` :
```
mongo
use tasks
db.list.insert([{title:"Installer MongiDB", isDone: false}, {title: "Configurer MongoDB", isDone: false}])
```
<br/>

> La base de données `task` sera créée si elle est inéxistante, tout comme la collection `list`. Le shell ne sert qu'à créer la collection et les documents à utiliser dans l'application, il peut être quitter en tapant la commande `exit`.


<br/>


Ouvrir une nouvelle fenêtre du terminal pour lancer le serveur NodeJs de l'application :
```
cd path/to/myNodeMongoServer/data
npm start
```
<br/>

> La commande `npm start` correspond à `nodemon server.js`. Cette commande est configurée pour relancer le serveur à chaque modifications.

<br/><br/>


## License
MIT © Julien Noyer [DigitalWorkshop](http://www.digitalworkshop.fr)
