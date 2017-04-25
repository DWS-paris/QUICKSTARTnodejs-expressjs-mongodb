/*
Configuration du server
*/
    // Importer les composants
    let express = require('express');
    let path = require('path');
    let bodyParser = require('body-parser');

    // Importer les fichiers de gestion des routes
    let front = require('./routes/front');
    let api = require('./routes/api');

    // Définir le port
    let port = 8080;

    // Initier le serveur
    let app = express();






/*
Middlewares
*/
    // Définir le dossier static de la partie frontend
    app.use(express.static(path.join(__dirname, 'client')));

    // Configurer body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    // Définir les routes
    app.use('/', front);
    app.use('/api', api);






/*
Lancer le server
*/ 
    app.listen( port, () => console.log('Le serveur est lancé sur le port ' + port) );