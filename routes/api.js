/*
Configuration du module
*/
    let express = require('express');
    let router = express.Router();

/*
Configuration de MongoDb
*/
    let mongodb = require('mongodb');
    let ObjectId = mongodb.ObjectID;
    let MongoClient = mongodb.MongoClient;
    let mongodbUrl = 'mongodb://localhost:27017/tasks';



/*
Configuration de la route principale => http://localhost:8080/api/tasks
*/
    router.get('/tasks', (req, res, next) => {

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(mongodbUrl, (err, db) =>{

            // Tester la connexion
            if(err){ res.send(err) } 
            else {

                // Récupération des documents de la collection 'list' => find
                db.collection('list').find().toArray((err, tasks) => {

                    // Tester la commande MongoDb
                    if(err){ res.send(err) }

                    else{ 
                        // Envoyer les données au format json
                        res.json(tasks)
                    }
                })
            }

            // Fermer la connexion à la base MongoDb
            db.close();
        })

    });




/*
Export du module
*/
    module.exports = router;