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
            const csv = JSONToCSV(incidents, { fields: [
                'entityId', 
                'entityName', 
                'fileName', 
                'maxMin', 
                'timeDiff', 
                'firstFileDate', 
                'firstFileTime', 
                'firstFileTod', 
                'firstFileDow', 
                'secondFileDate', 
                'secondFileTime', 
                'secondFileTod', 
                'secondFileDow', 
                'summary'    
            ] });
            // write file to asset folder
            fs.writeFileSync('./assets/secondReport.csv', csv)
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
            // set max minutes allowed between files (gathered from separate DB query)
            let maxMin = 90;
            // check to see if criteria for creating incident matches
            if (timeDiff > maxMin) {

                // creates object with relevant data to push to array which gets written to file
                incidents.push({
                    'entityId': source[i].ClientId,
                    'entityName': source[i].ENTITY_NAME,
                    'fileName': source[i].Name,
                    'maxMin': maxMin,
                    'timeDiff': timeDiff,
                    'firstFileDate': dateOne.format('MM/DD/YYYY'),
                    'firstFileTime': dateOne.format('HH:MM:SS:SSS'),
                    'firstFileTod': dateOne.format('A'),
                    'firstFileDow': dateOne.format('dddd'),
                    'secondFileDate': dateTwo.format('MM/DD/YYYY'),
                    'secondFileTime': dateTwo.format('HH:MM:SS:SSS'),
                    'secondFileTod': dateTwo.format('A'),
                    'secondFileDow': dateTwo.format('dddd'),
                    'summary': `Max time was exceeded by ${timeDiff} minutes on ${dateOne.format('dddd, MMMM Do YYYY, h:mm:ss a')}`
                });
            }
        }
    }
    // end of loop

});