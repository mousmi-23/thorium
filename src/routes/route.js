const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

module.exports = router;


//1.

router.get('/movies', function(req,res) {
    res.send('["Spider Man", "No Time To Die", "The Father", "Dune", "The Suicide Squad"]')
 });
 
 //2.
 router.get('/movies/:moviesid', function(req, res){
     movies = ["Spider Man", "No Time To Die", "The Father", "Dune", "The Suicide Squad"]
     let value = req.params.moviesid;
     if (value > movies.length-1) {
         res.send("doesn't exist")
     }
     else {
         res.send(movies[value])
     }
 })
 
 //3.
 router.get('/films',function(req,res) {
     res.send([ {id: 1, name: 'The Shining'}, {id: 2, name: 'Incendies'}, {id: 3, name: 'Rang de Basanti'}, {id: 4, name: 'Finding Demo'}])
 });
 
 
 //4.
router.get('/films/:filmid',function(req,res) {
     let films = [ {id: 1, name: 'The Shining'}, {id: 2, name: 'Incendies'}, {id: 3, name: 'Rang de Basanti'}, {id: 4, name: 'Finding Demo'}]
     let value =req.params.filmid;
     let found = false;
     for(i=0; i<films.length; i++){
         if (films[i].id==value){
             found=true
             res.send(films[i])
             break;
         }
     }
     if (found == false){
         res.send("No films exists with this id")
     }
    });

 module.exports = router;