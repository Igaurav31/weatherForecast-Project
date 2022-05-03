const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
const https = require("https");
const { json } = require("express/lib/response");

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/", function(req, res){
    let cityname = req.body.city;        // get data  
    const appid ="cda42f7250658a1b71b1be2a21958b39";
    const link = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid="+appid+"&units=metric";
    //using https to get / request data from external server
    // https.get(link,function(response){
    //     console.log(response.statusCode)
    //     response.on("data",function(data){
    //         let forcastinfo = JSON.parse(data)

    //     });
    
    // });
    https.get(link , "JSON", function(response){
        var data;
        response.on("data", function(chunk) {
          if (!data) {
            data = chunk;
          } else {
            data += chunk;
          }
        });
    
        response.on("end", function() {
            const forcastinfo=JSON.parse(data);
            console.log(forcastinfo);

            res.sendStatus(forcastinfo.hourly);
        });
    });
    

});

app.listen(process.env.PORT || 3000,function(){
    console.log("server created");
})