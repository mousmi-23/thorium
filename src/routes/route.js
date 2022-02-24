const express = require('express');
const router = express.Router();

//ASSIGNMENT:
// you will be given an array of persons ( i.e an array of objects )..each person will have a {name: String , age: Number, votingStatus: true/false(Boolean)}
// take input in query param as votingAge..and for all the people above that age, change votingStatus as true
// also return an array consisting of only the person that can vote
//  take this as sample for array of persons:

let persons= [
 {
 name: "PK",
 age: 10,
 votingStatus: false
},
{
 name: "SK",
 age: 20,
 votingStatus: false
},
{
 name: "AA",
 age: 70,
 votingStatus: false
},
{
 name: "SC",
 age: 5,
 votingStatus: false
},
{
 name: "HO",
 age: 40,
 votingStatus: false
}
]

router.post('/check', function(req, res) {
    const votingAge = req.query.votingAge; 
    const dataRes = persons.filter(data => data.age > votingAge ? data.votingStatus = true : data.votingStatus = false);
    res.send(dataRes); 
}); 
module.exports = router;








// router.post("/post-query-1", function(req, res) {
//     let input = req.query.votingAge
//     let finalArr = persons.filter(ele => ele > input)
//    res.send ({result: finalArr, votingStatus=true})
// });