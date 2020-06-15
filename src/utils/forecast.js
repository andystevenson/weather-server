const request = require('postman-request');

class Weatherstack {
  constructor(latitude, longitude) {
    this.apiKey = '613b044e469580a0f0481c694ecd883a';
    this.base = `http://api.weatherstack.com`;
    this.current = `${this.base}/current?access_key=${this.apiKey}`;
    this.units = 'm';
    this.query = `${this.current}&query=${latitude},${longitude}&units=${this.units}`;
  }
}

const forecast = function (latitude, longitude, cb) {
  const weatherstack = new Weatherstack(latitude, longitude);
  console.log(weatherstack.query);
  request(
    { url: weatherstack.query, json: true },
    (err, response) => {
      // if err is set we could not contact the forecast service
      if (err) {
        cb('Could not connect to forecast service');
        return console.log({ err });
      }

      // if there are no features the it is an invalid location
      if (response.body.error) {
        cb(`[${latitude},${longitude}] is an invalid location for the forecast service`);
        return console.log('body-error', response.body.error);
      }

      // we have valid weather

      const current = response.body.current;
      const { weather_descriptions, temperature, feelslike, weather_icons } = current;

      let weather = `${weather_descriptions[0]}, ${temperature} degrees`;
      if (temperature !== feelslike) weather += `, but feels like ${feelslike}`;

      const [icon] = weather_icons;
      const noError = undefined;
      cb(noError, { weather, icon });
    });
};

module.exports = forecast;