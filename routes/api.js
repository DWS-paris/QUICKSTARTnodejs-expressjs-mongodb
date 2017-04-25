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
Configuration de la route pous ajouter une tache => http://localhost:8080/api/task
*/
    router.post('/task', (req, res, next) => {

        // Récupération des données depuis la requête
        let task = req.body;

        // Vérifier la présence de valeur dans la requête
        if(!task.title){ res.status(400); res.json({ "error": "Bad Data" });
        } else {

            // Définition de la propriété isDone
            task.isDone = false;

            // Ouvrir une connexion sur la base MongoDb
            MongoClient.connect(mongodbUrl, (err, db) =>{

                // Tester la connexion
                if(err){ res.send(err); db.close(); } 
                else{

                    // Ajouter un document dans la collection 'list' => insert
                    db.collection('list').insert([task], (err, data) => {

                        // Vérification de a commande MongoDb
                        if(err){  res.send(err) } 
                        else{
                            res.send(task)
                            // Fermer la connexion à la base MongoDb
                            db.close()
                        }
                    })
                }
            })
        }

    });


/*
Configuration de la route pour mettre à jour une tâche => put
*/
    router.put('/task/:id', (req, res, next) => {
        // Récupération des données depuis la requête
        let task = req.body;

        // Définition d'un objet pour analyser les données de la requête
        let updTask = {};
        
        // Assignation des valeurs de la requête dans l'objet
        if(task.isDone){ updTask.isDone = task.isDone; }
        if(task.title){ updTask.title = task.title; }

        // Vérifier la présence de valeur dans la requête
        if(!updTask){ res.status(400); res.json({ "error":"Bad Data" });
        } else {

            // Ouvrir une connexion sur la base MongoDb => connect
            MongoClient.connect(mongodbUrl, (err, db) =>{

                // Tester la connexion
                if(err){ res.send(err) } 
                else{

                    // Mettre à jour un document dans la collection 'list' => update
                    db.collection('list').update({ _id: new ObjectId(req.params.id) },updTask, {}, (err, data) => {

                        // Vérification de la commande MongoDb
                        if(err){  res.send(err) } 
                        else{
                            res.send(data)
                            // Fermer la connexion à la base MongoDb
                            db.close()
                        }

                    })
                }
            })
        }
    });



/*
Configuration de la route pour supprimer une tâche => delete
*/
    router.delete('/task/:id', function(req, res, next){

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(mongodbUrl, (err, db) =>{

            // Tester la connexion
            if(err){ res.send(err) } 
            else{

                // Supprimer un document dans la collection 'list' => remove
                db.collection('list').remove({ _id: new ObjectId(req.params.id) }, (err, data) => {

                    // Vérification de la commande MongoDb
                    if(err){  res.send(false) } 
                    else{
                        res.send(data)
                        // Fermer la connexion à la base MongoDb
                        db.close()
                    }
                })
            }            
        })
    });


/*
Export du module
*/
    module.exports = router;