const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const https = require("https");
const { json } = require("express/lib/response");
const fetch = require('node-fetch');
var _ = require('lodash');
// const unixconvertor = require("./functions");
app.set('view engine', 'ejs');
// const convertor = require(__dirname + "/functions.js");
// const coordinates = [{lat:18.521428 , lon:73.8544541}]
// var dataset = {"hello":"world"};

app.get("/", function (req, res) {
  let pagename = "";
  res.render("index",{pagename:pagename});
})
//reminder:add code which gives user choice to choose between unit 
app.post("/", function (req, res) {
  let cityname = req.body.city;        // get data  
  const appid = "cda42f7250658a1b71b1be2a21958b39";
  let coordinatelink = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=1&appid=" + appid + "";
   fetch(coordinatelink)
    .then(response => response.json())
    .then(data => {
      // const coords = [{lat : data[0].lat ,
      // lon : data[0].lon
      // }];
      let lat = data[0].lat;
      let lon = data[0].lon;
      const link = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appid + "&units=metric";
      return fetch(link);
    

    })
    .then(responce => responce.json())
    .then(data => {

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
      var sunsetFormattedTime = sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2);
      dataset = JSON.stringify(data);
      let iconurl = "http://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png"
    
      res.render("searchloc",{cityname:cityname,icon:iconurl,currenttemp:data.current.temp});
      
    })
  
});

app.get("/searchloc",function(req,res){
  //use ejs to embed data and refer to onenote to for editing html
 
  
})

app.post("/searchloc", function(req,res){
  cityname = req.body.city;
  // let iconurl = "http://openweathermap.org/img/wn/"+ dataset.current.weather[0].icon+"@2x.png"
  let iconurl = "http://openweathermap.org/img/wn/"+ data.current.weather[0].icon+ "@2x.png"
  res.render("searchloc",{cityname:cityname,icon:iconurl});
})




app.listen(process.env.PORT || 3000, function () {
  console.log("server created");
})