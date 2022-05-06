module.exports = unixconvertor;     
// // timestamp =1651845775;
// // function unixconvertor(timestamp) {
// //     var date = new Date(timestamp);

// //     console.log("Date: "+date.getDate()+
// //               "/"+(date.getMonth()+1)+
// //               "/"+date.getFullYear()+
// //               " "+date.getHours()+
// //               ":"+date.getMinutes()+
// //               ":"+date.getSeconds());
    
// //   }
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
function unixconvertor(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);
}

