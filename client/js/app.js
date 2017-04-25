$(document).ready(function(){

    
    /*
    Fonction pour récupérer la liste des tâche depuis la BDD MongoDb
    */
        function getTasks(){

            // Afficher les documents de la collection MongoDB => find()
            $.ajax({
                url: 'http://localhost:8080/api/tasks',
                dataType: 'JSON',
                type: 'GET',

                success: function(data){

                    if(data.name == "MongoError"){
                        $('main').html('<p><b>Problème de connexion MongoDB...</b></p><p>Code erreur : ' + data.message + '</p>')

                    } else{
                        // Boucle sur la collection MongoDb
                        for( i = 0; i < data.length; i++ ){
                            
                            // Ajout des tâches dans le DOM
                            addTask(data[i].title, data[i]._id, data[i].isDone);
                        }
                    }
                },

                error: function(err){
                    $('main').html('<p><b>Problème de connexion Ajax...</b></p><p>Code erreur : ' + err.status + '</p>')
                }
            })

        }


    
    /*
    Fonction pour ajouter une tâche dans le DOM
    */
        function addTask(title, id, isDone){

            // Ajouter des un article dans la dernière section du main
            $('main').append(''+
                '<article id="task' + id + '" class="taskListItem taskIsDone' + isDone + '">' +
                    '<h2>' + title + '</h2>' +
                '</article>'
            );
        };

 
    

    /*
    Afficher la liste de tâche
    */
        getTasks();

})