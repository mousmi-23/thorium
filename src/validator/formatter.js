const trimData = ()=>{
    let str = "  Mousmi  ";
    return str.trim(); 
}
const changetoLowerCase = ()=>{
    let str = "MOusMI"; 
    return str.toLowerCase(); 
}

const changeToUpperCase = ()=>{
    let str = "mousmi"; 
    return str.toUpperCase(); 
}

module.exports = {
    trimData: trimData,
    lowerCase: changetoLowerCase,
    upperCase: changeToUpperCase
}