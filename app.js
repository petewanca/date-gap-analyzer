// set dependencies and variables
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv').parse;
const moment = require('moment');
const fs = require('fs');
const incidents = []
const data = []

// retrieve data from loaded csv 
CSVToJSON().fromFile('assets/redacted.csv').then(source => {
    // log start of report
    console.log('report started at: ' + new Date());
    console.log(`preparing ${source.length} records`)
    // use for loop to go through each record
    for (let i = 0; i < source.length; i++) {
        // if next item in array is undefined, report is complete and report generated via csv
        if ((source[i] === undefined) || (source[i+1] === undefined)) {
            // json to csv conversion
            const csv = JSONToCSV(incidents, { fields: ['entityId','entityName', 'fileName', 'maxMin', 'timeDiff', 'dateReceived', 'previousFile', 'summary'] });
            // write file to asset folder
            fs.writeFileSync('./assets/report.csv', csv)
            // log end of report
            console.log('report ended at: ' + new Date());
            console.log(`${incidents.length} incidents found.`)

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

                incidents.push({
                    'entityId': source[i].ClientId,
                    'entityName': source[i].ENTITY_NAME,
                    'fileName': source[i].Name,
                    'maxMin': maxMin,
                    'timeDiff': timeDiff,
                    'dateReceived': dateOne,
                    'previousFile': dateTwo,
                    // 'dayOfWeek': moment(dateOne).weekday(),
                    'summary': record
                });

            }
        }
    }
    // end of loop

});