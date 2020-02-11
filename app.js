// set dependencies
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv');
const FileSystem = require('fs');

// set variable to hold response from csv grab.
let data;

// retrieve data from loaded csv and set to local variable for manipulation
CSVToJSON().fromFile('assets/redacted_success.csv').then(source => {
    data = source;
});