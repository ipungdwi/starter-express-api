const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const apiKey = "98157aec8d32c66db3b1d3b0acbcedb3";

//Konfigurasi agar server dapat melihat folder public
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//Setting EJS
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render('index', {weather:null, error:null});
});
app.get("/user", function (req, res) {
  res.render('index', {weather:null, error:null});
});

app.post("/", function (req, res) {
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url, function (err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "Error, Please try Again" });
    } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined) {
            res.render("index", { weather: null, error: "Error, Please try Again" });
        } else {
            let weatherText =  `It's ${weather.main.temp} degress in ${weather.name}`;
            res.render('index', {weather: weatherText, error:null})
        }
    }
  });
});

app.listen(3000, function () {
  console.log("Kode Weather Listening on port 3000");
});
