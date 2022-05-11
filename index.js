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
      

      function sunrisetime(suntime){
        var date = new Date(suntime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
  
        }
      const sunrise = sunrisetime(data.current.sunrise);                              
      const sunset =  sunrisetime(data.current.sunset);                                
      let iconurl = "http://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png"

      //unix to date
      function unixtodate(unixt){var a = new Date(unixt * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + ' ' + date  ;
        return time;
      }
      let day1 = unixtodate(data.daily[0].dt);
      let day2 = unixtodate(data.daily[1].dt);
      let day3 = unixtodate(data.daily[2].dt);
      let day4 = unixtodate(data.daily[3].dt);
      let day5 = unixtodate(data.daily[4].dt);
      let day6 = unixtodate(data.daily[5].dt);
      let day7 = unixtodate(data.daily[6].dt);
      let day1icon = "http://openweathermap.org/img/wn/"+ data.daily[0].weather[0].icon +"@2x.png"
      let day2icon = "http://openweathermap.org/img/wn/"+ data.daily[1].weather[0].icon+"@2x.png"
      let day3icon = "http://openweathermap.org/img/wn/"+ data.daily[2].weather[0].icon +"@2x.png"
      let day4icon = "http://openweathermap.org/img/wn/"+ data.daily[3].weather[0].icon +"@2x.png"
      let day5icon = "http://openweathermap.org/img/wn/"+ data.daily[4].weather[0].icon +"@2x.png"
      let day6icon = "http://openweathermap.org/img/wn/"+ data.daily[5].weather[0].icon +"@2x.png"
      let day7icon = "http://openweathermap.org/img/wn/"+ data.daily[6].weather[0].icon +"@2x.png"
      res.render("searchloc",{cityname:cityname,icon:iconurl,currenttemp:data.current.temp,description:data.current.weather[0].description,feels_like:data.current.feels_like,wind:data.current.wind_speed,visibility:data.current.visibility,pressure:data.current.pressure,dew_point:data.current.dew_point,uvi:data.current.uvi, day1:day1, day2:day2, day3:day3, day4:day4,day5:day5,day6:day6,day7:day7,day1icon:day1icon,day2icon:day2icon,day3icon:day3icon,day4icon:day4icon,day5icon:day5icon,day6icon:day6icon,day7icon:day7icon,day1maxtemp:data.daily[0].temp.max,day2maxtemp:data.daily[1].temp.max,day3maxtemp:data.daily[2].temp.max,day4maxtemp:data.daily[3].temp.max,day5maxtemp:data.daily[4].temp.max,day6maxtemp:data.daily[5].temp.max,day7maxtemp:data.daily[6].temp.max,day1mintemp:data.daily[0].temp.min,day2mintemp:data.daily[1].temp.min,day3mintemp:data.daily[2].temp.min,day4mintemp:data.daily[3].temp.min,day5mintemp:data.daily[4].temp.min,day6mintemp:data.daily[5].temp.min,day7mintemp:data.daily[6].temp.min,day1description:data.daily[0].weather[0].description,day2description:data.daily[1].weather[0].description,day3description:data.daily[2].weather[0].description,day4description:data.daily[3].weather[0].description,day5description:data.daily[4].weather[0].description,day6description:data.daily[5].weather[0].description,day7description:data.daily[6].weather[0].description});
      
    })
  
});


// app.get("/searchloc",function(req,res){
  
 
  
// })

// app.post("/searchloc", function(req,res){
//   cityname = req.body.city;
//   // let iconurl = "http://openweathermap.org/img/wn/"+ dataset.current.weather[0].icon+"@2x.png"
//   let iconurl = "http://openweathermap.org/img/wn/"+ data.current.weather[0].icon+ "@2x.png"
//   res.render("searchloc",{cityname:cityname,icon:iconurl});
// })




app.listen(process.env.PORT || 3000, function () {
  console.log("server created");
})