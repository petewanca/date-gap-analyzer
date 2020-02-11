// set dependencies
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv');
const moment = require('moment');
const FileSystem = require('fs');
let data = [];
let counter = 1;


// retrieve data from loaded csv and set to local variable for manipulation
CSVToJSON().fromFile('assets/redacted_success.csv').then(source => {
    data = source;

    for (let i = 0; i < data.length; i++) {
        let maxMin = 60;
        let dateOne = moment(data[i].DateLoaded);
        // console.log(dateOne);
        let dateTwo = moment(data[i++].DateLoaded);
        // console.log(dateTwo);
        let difference; //= dateOne.diff(dateTwo, 'minutes'); 
        // console.log(diff);

        if ((dateOne) && (dateTwo)) {
            difference = dateOne.diff(dateTwo, 'minutes'); 
        }
        console.log('hello')
        if (difference > maxMin) {
            // setInterval(() => {
                console.log(`max minutes exceeded: ${difference}`); 
            i++;
        } else if ((!dateOne) || (!dateTwo)) {
            console.log('all done')
        } else i++;
    }

        


});



// 1 minute = 60000 miliseconds

// 75000 in 2 mins
// 37500 in 1 min
// 625 per second
// 0.625 per milisecond