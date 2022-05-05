export function unixconvertor(timestamp) {
    var date = new Date(timestamp);

    console.log("Date: "+date.getDate()+
              "/"+(date.getMonth()+1)+
              "/"+date.getFullYear()+
              " "+date.getHours()+
              ":"+date.getMinutes()+
              ":"+date.getSeconds());
  }
