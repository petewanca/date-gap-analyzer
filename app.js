// set dependencies
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv').parse;
const moment = require('moment');
const fs = require('fs');
const incidents = []

// retrieve data from loaded csv 
CSVToJSON().fromFile('assets/redacted_success.csv').then(source => {
    
    // use for loop to go through each record
    for (let i = 0; i < source.length; i++) {
        
        // if the NEXT item in the array is undefined, the report is complete and files will be written to csv file
        if ((source[i] === undefined) || (source[i+1] === undefined)) {
            console.log('report complete')
            console.log(incidents)
            const csv = JSONToCSV(incidents, { fields: ["incident"] });
            fs.writeFileSync('./assets/report.csv', csv)

        // otherwise, start report
        } else {

            // create d/t values out of strings
            let dateOne = moment(source[i].DateLoaded);
            let dateTwo = moment(source[i+1].DateLoaded);
            // compute the difference between current time's index and the next index's time
            let timeDiff = dateOne.diff(dateTwo, 'minutes');
            // get the max minutes allowed before alert fires in DB
            let maxMin = source[i].MAX_MINUTES;

            // if the difference in time is greater than the minutes allowed before report fires, write to file
            if (timeDiff > maxMin) {
                let record = `Max time was exceeded by ${timeDiff} minutes on ${dateOne}`;
                // console.log(record);
                incidents.push({'incident': record});
            }
        }
    }
    // end of loop

});