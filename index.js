const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
const https = require("https");
const { json } = require("express/lib/response");
const fetch = require('node-fetch');
const unixconvertor = require("./functions");
app.set('view engine', 'ejs');
const convertor = require(__dirname+"/functions.js");
// let sunDate = [":"];

app.get("/", function(req, res){
    res.render("index");
})

app.post("/", function(req, res){
    let cityname = req.body.city;        // get data  
    const appid ="cda42f7250658a1b71b1be2a21958b39";

    const cordinateurl = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityname +"&limit=5&appid="+ appid +"";
    fetch(cordinateurl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    
    const link = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid="+appid+"&units=metric";
    //using https to get / request data from external server
    // https.get(link,function(response){
    //     console.log(response.statusCode);
    //     response.on("data",function(data){
    //       const weatherdata = JSON.parse(data);

    //     });
    
    // });
    // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=cda42f7250658a1b71b1be2a21958b39&units=metric
    return fetch(link)
  .then(response => response.json())
  .then(data =>{
       
    const sunrise = data.current.sunrise;
    var sunriseDate = new Date(sunrise * 1000);
    var sunriseHours = sunriseDate.getHours();
    var sunriseMinutes = "0" + sunriseDate.getMinutes();
    var sunriseSeconds = "0" + sunriseDate.getSeconds();
    var sunriseFormattedTime = sunriseHours + ':' + sunriseMinutes.substr(-2) + ':' + sunriseSeconds.substr(-2);
    const sunset = data.current.sunset;
    var sunsetDate = new Date(sunset * 1000);
    var sunsetHours = sunsetDate.getHours();
    var sunsetMinutes = "0" + sunsetDate.getMinutes();
    var sunsetSeconds = "0" + sunsetDate.getSeconds();
    var sunsetFormattedTime =sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2);
    // let sunriseTime = unixconvertor(data.current.sunrise);
    // sunDate.push[sunriseFormattedTime];
    // // sunDate.forEach(date);
    // // sunTime=sunDate[i];
    // sunDate.forEach(element =>{
    //     sunTime=sunDate[element];
    // });
    res.write("<h1>**Current Weather Data**</h1>")
    res.write("<p>Sunrise time is "+ sunriseFormattedTime +"</p>");
    res.write("<p>Sunrise time is "+ sunsetFormattedTime +"</p>");
    res.write("<p>Current tempreture "+ data.current.temp+"°C</p>");
    res.write("<p>Feels like "+ data.current.feels_like+"°C</p>");
    res.write("<p>pressure "+ data.current.pressure+ "hPa</p>");
    res.write("<p> Humidity "+ data.current.humidity+" %</p>");
    res.write("<p> clouds "+ data.current.clouds+" %</p>");
    res.write("<p>weather"+ data.current.weather[0].description+"</p>");
    let iconurl = "http://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png"
    res.write("<img src="+iconurl+">");
    res.write()
    res.send(); 

  });

  

});

app.listen(process.env.PORT || 3000,function(){
    console.log("server created");
})