const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
const https = require("https");
const { json } = require("express/lib/response");
const fetch = require('node-fetch');
app.set('view engine', 'ejs');
import { unixconvertor } from './functions.js';
// let sunDate = [":"];

app.get("/", function(req, res){
    res.render("index");
})

app.post("/", function(req, res){
    let cityname = req.body.city;        // get data  
    const appid ="cda42f7250658a1b71b1be2a21958b39";
    const link = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid="+appid+"&units=metric";
    //using https to get / request data from external server
    // https.get(link,function(response){
    //     console.log(response.statusCode);
    //     response.on("data",function(data){
    //       const weatherdata = JSON.parse(data);

    //     });
    
    // });
    fetch(link)
  .then(response => response.json())
  .then(data =>{
       
    const sunrise = data.current.sunrise;
    var sunriseDate = new Date(sunrise * 1000);
    var sunriseHours = sunriseDate.getHours();
    var sunriseMinutes = "0" + sunriseDate.getMinutes();
    var sunriseSeconds = "0" + sunriseDate.getSeconds();
    var sunriseFormattedTime = sunriseHours + ':' + sunriseMinutes.substr(-2) + ':' + sunriseSeconds.substr(-2);
    // sunDate.push[sunriseFormattedTime];
    // // sunDate.forEach(date);
    // // sunTime=sunDate[i];
    // sunDate.forEach(element =>{
    //     sunTime=sunDate[element];
    // });
    res.write("<h1>Sunrise time is "+ sunriseFormattedTime+"</h1>");
    res.send();

  });

  

});

app.listen(process.env.PORT || 3000,function(){
    console.log("server created");
})