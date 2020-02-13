// set dependencies
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv');
const moment = require('moment');
const FileSystem = require('fs');


// retrieve data from loaded csv and set to local variable for manipulation
CSVToJSON().fromFile('assets/redacted_success.csv').then(source => {
    for (let i = 0; i < source.length; i++) {
        if ((source[i] === undefined) || (source[i+1] === undefined)) {
            console.log('all done')
        } else {
            let dateOne = moment(source[i].DateLoaded);
            let dateTwo = moment(source[i+1].DateLoaded);
            // console.log(`date one: ${dateOne}`)
            // console.log(`date two: ${dateTwo}`)
            let difference = dateOne.diff(dateTwo, 'minutes');
            console.log(`difference ${i+1}: ${difference}`);
        }
    }
});


// 1 minute = 60000 miliseconds
// 75000 in 2 mins
// 37500 in 1 min
// 625 per second
// 0.625 per milisecond