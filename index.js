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
  res.render("index", { pagename: pagename });
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
    // .catch(error=> {
    //   document.getElementsByName('city').placeholder= "Please search for a valid city 😩"
    //   console.error('There was an error!', error);
    // })
    .then(responce => responce.json())
    .then(data => {


      function unixtotime(suntime) {
        var date = new Date(suntime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;

      }
      const sunrise = unixtotime(data.current.sunrise);
      const sunset = unixtotime(data.current.sunset);
      let iconurl = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"

      //unix to date
      function unixtodate(unixt) {
        var a = new Date(unixt * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + ' ' + date;
        return time;
      }
      let day1 = unixtodate(data.daily[0].dt);
      let day2 = unixtodate(data.daily[1].dt);
      let day3 = unixtodate(data.daily[2].dt);
      let day4 = unixtodate(data.daily[3].dt);
      let day5 = unixtodate(data.daily[4].dt);
      let day6 = unixtodate(data.daily[5].dt);
      let day7 = unixtodate(data.daily[6].dt);
      let day1icon = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png"
      let day2icon = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png"
      let day3icon = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png"
      let day4icon = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png"
      let day5icon = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png"
      let day6icon = "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png"
      let day7icon = "http://openweathermap.org/img/wn/" + data.daily[6].weather[0].icon + "@2x.png"
      let time1 = unixtotime(data.hourly[11].dt);
      let time2 = unixtotime(data.hourly[12].dt);
      let time3 = unixtotime(data.hourly[13].dt);
      let time4 = unixtotime(data.hourly[14].dt);
      let time5 = unixtotime(data.hourly[15].dt);
      let time6 = unixtotime(data.hourly[16].dt);
      let time7 = unixtotime(data.hourly[17].dt);
      let time8 = unixtotime(data.hourly[18].dt);
      let time9 = unixtotime(data.hourly[19].dt);
      let time10 = unixtotime(data.hourly[20].dt);
      let time11 = unixtotime(data.hourly[21].dt);
      let time12 = unixtotime(data.hourly[22].dt);
      let time13 = unixtotime(data.hourly[23].dt);
      let time14 = unixtotime(data.hourly[24].dt);
      let time15 = unixtotime(data.hourly[25].dt);
      let time16 = unixtotime(data.hourly[26].dt);
      let time17 = unixtotime(data.hourly[27].dt);
      let time18 = unixtotime(data.hourly[28].dt);

      res.render("searchloc", { cityname: cityname, icon: iconurl,sunrise:sunrise,sunset:sunset,currenttemp: data.current.temp, description: data.current.weather[0].description, feels_like: data.current.feels_like, wind: data.current.wind_speed, visibility: data.current.visibility, pressure: data.current.pressure, dew_point: data.current.dew_point, uvi: data.current.uvi, day1: day1, day2: day2, day3: day3, day4: day4, day5: day5, day6: day6, day7: day7, day1icon: day1icon, day2icon: day2icon, day3icon: day3icon, day4icon: day4icon, day5icon: day5icon, day6icon: day6icon, day7icon: day7icon, day1maxtemp: data.daily[0].temp.max, day2maxtemp: data.daily[1].temp.max, day3maxtemp: data.daily[2].temp.max, day4maxtemp: data.daily[3].temp.max, day5maxtemp: data.daily[4].temp.max, day6maxtemp: data.daily[5].temp.max, day7maxtemp: data.daily[6].temp.max, day1mintemp: data.daily[0].temp.min, day2mintemp: data.daily[1].temp.min, day3mintemp: data.daily[2].temp.min, day4mintemp: data.daily[3].temp.min, day5mintemp: data.daily[4].temp.min, day6mintemp: data.daily[5].temp.min, day7mintemp: data.daily[6].temp.min, day1description: data.daily[0].weather[0].description, day2description: data.daily[1].weather[0].description, day3description: data.daily[2].weather[0].description, day4description: data.daily[3].weather[0].description, day5description: data.daily[4].weather[0].description, day6description: data.daily[5].weather[0].description, day7description: data.daily[6].weather[0].description, time1: time1, des1: data.hourly[11].weather[0].description, max1: data.hourly[11].temp, time2: time2, des2: data.hourly[12].weather[0].description, max2: data.hourly[12].temp, time3: time3, des3: data.hourly[13].weather[0].description, max3: data.hourly[13].temp, time4: time4, des4: data.hourly[14].weather[0].description, max4: data.hourly[14].temp, time5: time5, des5: data.hourly[12].weather[0].description, max5: data.hourly[15].temp, time6: time6, des6: data.hourly[16].weather[0].description, max6: data.hourly[16].temp, time7: time7, des7: data.hourly[17].weather[0].description, max7: data.hourly[17].temp, time8: time8, des8: data.hourly[18].weather[0].description, max8: data.hourly[18].temp, time9: time9, des9: data.hourly[19].weather[0].description, max9: data.hourly[19].temp, time10: time10, des10: data.hourly[20].weather[0].description, max10: data.hourly[20].temp, time11: time11, des11: data.hourly[21].weather[0].description, max11: data.hourly[21].temp, time12: time12, des12: data.hourly[22].weather[0].description, max12: data.hourly[22].temp, time13: time13, des13: data.hourly[23].weather[0].description, max13: data.hourly[23].temp, time14: time14, des14: data.hourly[24].weather[0].description, max14: data.hourly[12].temp, time15: time15, des15: data.hourly[25].weather[0].description, max15: data.hourly[25].temp, time16: time16, des16: data.hourly[26].weather[0].description, max16: data.hourly[26].temp, time17: time17, des17: data.hourly[27].weather[0].description, max17: data.hourly[27].temp, time18: time18, des18: data.hourly[28].weather[0].description, max18: data.hourly[28].temp });

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