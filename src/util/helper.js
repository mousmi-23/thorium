const printDate = () => {
    return new Date().toLocaleDateString();
}

const printMonth = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let currentMonth = new Date().getMonth();
    currentMonth = monthNames[currentMonth];
    return currentMonth;
}

const getBatchInfo = ()=>{
    return 'Thorium, W3D1, the topic for today is Nodejs module system.';
}

module.exports = {
    currentDate: printDate,
    currentMonth: printMonth,
    batchInfo: getBatchInfo
}