// set dependencies
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv');
const moment = require('moment');
const FileSystem = require('fs');
const data = [];
let counter = 1;


// retrieve data from loaded csv and set to local variable for manipulation
CSVToJSON().fromFile('assets/redacted_success.csv').then(source => {
    for (let i = 0; i < source.length; i++) {
        let dateOne = moment(source[i].DateLoaded);
        let dateTwo = moment(source[i+1].DateLoaded);
        // console.log(`date one: ${dateOne}`)
        // console.log(`date two: ${dateTwo}`)

        let difference = dateOne.diff(dateTwo, 'minutes');
        console.log(`difference ${i+1}: ${difference}`);
        // i++
    }
    // console.log(`array 0 value: ${source[0].DateLoaded}`);
    // console.log('moment array 0 value: ' + moment(source[0].DateLoaded));

    // console.log(`array 24 value: ${source[24].DateLoaded}`);
    // console.log('moment array 24 value: ' + moment(source[24].DateLoaded));

    // var difference = (moment(source[0].DateLoaded).diff(moment(source[24].DateLoaded), 'minutes'));
    // var minutes = 60;
    // for (let i = 0; i < source.length; i++ ) {
    //             let dateOne = moment(data[i].DateLoaded).format();
    //     console.log(dateOne);
    //     let dateTwo = moment(data[i++].DateLoaded).format();
    //     console.log(dateTwo);
        
        
    //     var difference = (moment(source[i].DateLoaded).diff(moment(source[i++].DateLoaded), 'minutes'));
    //     var minutes = 60;
    //     if (difference>minutes) {
    //         console.log('minutes exceeded');
    //         i++;
    //     } else {
    //         console.log('no difference');
    //         i++;
    //     }
    // }

    // var difference = (moment(source[1].DateLoaded).diff(moment(source[1].DateLoaded), 'minutes'));
    // console.log(difference)
    // for (let i = 0; i < data.length; i++) {
    //     let maxMin = 60;
    //     let dateOne = moment(data[i].DateLoaded);
    //     // console.log(dateOne);
    //     let dateTwo = moment(data[i++].DateLoaded);
    //     // console.log(dateTwo);
    //     let difference; //= dateOne.diff(dateTwo, 'minutes'); 
    //     // console.log(diff);

    //     if ((dateOne) && (dateTwo)) {
    //         difference = dateOne.diff(dateTwo, 'minutes'); 
    //     }

    //     if (difference > maxMin) {
    //         // setInterval(() => {
    //             console.log(`max minutes exceeded: ${difference}`); 
    //         i++;
    //     } else if ((!dateOne) || (!dateTwo)) {
    //         console.log('all done')
    //     } else i++;
    // }

        


});


// 1 minute = 60000 miliseconds

// 75000 in 2 mins
// 37500 in 1 min
// 625 per second
// 0.625 per milisecond