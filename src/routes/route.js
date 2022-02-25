const express = require('express');
const router = express.Router();

// You have to write 2 POST apis:
// Write the api in first project directory (Routes/index.js or routes/route.js)

// Problem Statement 1 :
// NOTE: you must create the players array outside( on the top ) of the api( so that data is maintained across api hits )
// Your player collection should be an ARRAY of player objects. Each player object should have the following attributes:
// {
// "name": "manish",
// "dob": "1/1/1995",
// "gender": "male",
// "city": "jalandhar",
// "sports": [
// "swimming"
// ],
// "bookings": [
// ]
// }
// e.g. the players array would look like this:

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ],
           "bookings": [
               {
                   "bookingNumber": 1,
                   "sportId": "",
                   "centerId": "",
                   "type": "private",
                   "slot": '16286598000000',
                   "bookedOn": '31/08/2021',
                   "bookedFor": '01/09/2021'
               },
               {
                   "bookingNumber": 2,
                   "sportId": "",
                   "centerId": "",
                   "type": "private",
                   "slot": '16286518000000',
                   "bookedOn": '31/08/2001',
                   "bookedFor": '01/09/2001'
               },
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
           "bookings": []
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
           "bookings": []
       },
   ];
   router.post('/players', function(req,res) {
       const playersData = req.body;
       let playersStatus = null;
       for (let i=0; i<players.length; i++) {
           if(players[i].name == playersData.name) {
           playersStatus = true;
           break;
       } else {
             playersStatus = false;
       }
       }
       if (!playersStatus){
         players.push(playersData);
   res.send(players);
       } else {
           res.send("Player name is already exist...")
       }
}); 


    // Write a POST /players api that creates a new player ( that saves a player’s details and doesn’t
    // allow saving the data of a player with a name that already exists in the data)

    // Problem Statement 2 :
    // Follow the following structure for a booking resource
    // {
    // “bookingNumber”: 1
    // “sportId": “”,
    // “centerId: “”,
    // “type”: “private”,
    // “slot”: ‘16286598000000’,
    // “bookedOn”: ’31/08/2021',
    // “bookedFor”: ’01/09/2021’
    // }
    // Write an api that books a slot for a player with relevant details. The api looks like POST
    // /players/:playerName/bookings/:bookingId
    // Ensure the below conditions:

    // 1. PlayerName and bookingId are path params You have to ensure the playerName received must
    // exist in the players collection. If the playerName doesn’t exist in the players collection return an error
    // message that says something relevant about player not being found.

    // 2. For a valid playerName check if the bookingId is already present in the player’s booking. Again,
    // for a repeated bookingId send an error message conveying the booking was already processed. For
    // a relevant bookingId(which is new), add the booking object from request body to bookings array.
    // NOTE: you must create the players array outside( on the top ) of the api( so that data is
    // maintained across api hits)

router.post('/players/:playerName/booking/:bookingId', (request, response)=>{
    const playerName = request.params.playerName; 
    const bookingId = request.params.bookingId; 
    const bookingData = request.body; 
    bookingData.bookingNumber = Number(bookingId); 

    let playerNameStatus = "", bookingIdStatus = ""; 
    
    for(let i = 0; i < players.length; i++){
        if(players[i].name == playerName){
            playerNameStatus = i; 
            break; 
        }
        else{
            playerNameStatus = null; 
        }
    }
    if(playerNameStatus != null){
        if(players[playerNameStatus].bookings.length == 0){
            bookingIdStatus = players[playerNameStatus].bookings;
        }
        else{
            for(let i = 0; i < players[playerNameStatus].bookings.length; i++){
                if(players[playerNameStatus].bookings[i].bookingNumber == bookingId){
                    bookingIdStatus = null; 
                    break; 
                }
                else{
                    bookingIdStatus = players[playerNameStatus].bookings;  
                }
            }
        }
        if(bookingIdStatus != null){
            bookingIdStatus.push(bookingData);
            response.send(players); 
        }
        else{
            response.send("Booking number already exist !"); 
        }
    }
    else{
        response.send("Player name not found !"); 
    }
}); 

 module.exports = router;