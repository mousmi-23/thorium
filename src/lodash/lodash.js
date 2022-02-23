const _ = require("lodash"); 

const chunkMethod = ()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    console.log(_.chunk(monthNames, 3)); 
}

const tailMethod = ()=>{
    const oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    console.log(_.tail(oddNumbers));
}

const uninonMethod = ()=>{
    const arr1 = [1, 2, 3, 4], arr2 = [2, 3, 4, 6], arr3 = [5, 3, 7], arr4 = [89, 59, 1], arr5 = [4, 5, 14, 16]; 
    console.log(_.union(arr1, arr2, arr3, arr4, arr5)); 
}

const fromPairsMethod = ()=>{
    const data = [
        ["horror","The Shining"],
        ["drama","Titanic"],
        ["thriller","Shutter Island"],
        ["fantasy","Pans Labyrinth"]

    ]; 
    console.log(_.fromPairs(data)); 
}

module.exports = {
    chunkMethod: chunkMethod,
    tailMethod: tailMethod, 
    uninonMethod: uninonMethod,
    fromPairsMethod: fromPairsMethod
}