// set dependencies and variables
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv').parse;
const moment = require('moment');
const fs = require('fs');
const incidents = []

// retrieve data from destination dir
CSVToJSON().fromFile('../../date_gap_app_folders/exports_from_sql/redacted.csv').then(source => {
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
                'maxMinsAllowed', 
                'timeDiffBetweenFiles', 
                'recentFileDate', 
                'recentFileTime', 
                'recentFileTod', 
                'recentFileDow', 
                'previousFileDate', 
                'previousFileTime', 
                'previousFileTod', 
                'previousFileDow', 
                'summary'    
            ] });
            // write file to destination dir
            fs.writeFileSync(`../../date_gap_app_folders/reports_generated_by_app/${source[i].ClientId}_report_${moment().format('MM_DD_YYYY')}.csv`, csv)
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
            let maxMin = 60;
            // check to see if criteria for creating incident matches
            if (timeDiff > maxMin) {

                // creates object with relevant data to push to array which gets written to file
                incidents.push({
                    'entityId': source[i].ClientId,
                    'entityName': source[i].ENTITY_NAME,
                    'fileName': source[i].Name,
                    'maxMinsAllowed': maxMin,
                    'timeDiffBetweenFiles': timeDiff,
                    'recentFileDate': dateOne.format('MM/DD/YYYY'),
                    'recentFileTime': dateOne.format('HH:MM:SS:SSS'),
                    'recentFileTod': dateOne.format('A'),
                    'recentFileDow': dateOne.format('dddd'),
                    'previousFileDate': dateTwo.format('MM/DD/YYYY'),
                    'previousFileTime': dateTwo.format('HH:MM:SS:SSS'),
                    'previousFileTod': dateTwo.format('A'),
                    'previousFileDow': dateTwo.format('dddd'),
                    'summary': `Max time was exceeded by ${timeDiff} minutes on ${dateOne.format('dddd, MMMM Do YYYY, h:mm:ss a')}`
                });
            }
        }
    }
    // end of loop

});