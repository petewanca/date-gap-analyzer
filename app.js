// set dependencies
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv');
const moment = require('moment');
const FileSystem = require('fs');

// set variable to hold response from csv grab.
let data = [];
// retrieve data from loaded csv and set to local variable for manipulation
CSVToJSON().fromFile('assets/redacted_success.csv').then(source => {
    data = source;
}).then(() => {
    
    for (let i = 0; i < data.length; i++) {
        let maxMin = data[i].MAX_MINUTES;
        let dateOne = moment(data[i].DateLoaded)
        let dateTwo = moment(data[i+1].DateLoaded)
        let diff = dateOne.diff(dateTwo, 'minutes');

        if ((dateOne) && (dateTwo)) {
            if (diff > maxMin) {
                console.log(`uh oh! diff: ${diff}`);
            }
        }
    }


    // let dateOne = moment(data[0].DateLoaded)
    // let dateTwo = moment(data[1].DateLoaded)
    // let diff = dateOne.diff(dateTwo, 'minutes');
    // console.log(diff);
    
});

