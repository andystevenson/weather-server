const request = require('postman-request');

// geocoding
class Mapbox {
  constructor(where) {
    this.apiKey = 'pk.eyJ1IjoiYW5keXN0ZXZlbnNvbiIsImEiOiJja2I5a2RucDIwYWIxMnpxcWplYTZzcnFnIn0.QhQdvRZ4tyUxUE9S1qgEFg';
    this.limit = 1;
    this.where = encodeURIComponent(where);
    this.geocoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.where}.json?access_token=${this.apiKey}`;
    this.query = `${this.geocoding}&limit=${this.limit}`;
  }
}

const geocode = (where, cb) => {

  const mapbox = new Mapbox(where);

  request(
    { url: mapbox.query, json: true },
    (err, response) => {
      // err will be set if we couldn't connect to the service
      if (err) {
        cb('Could not connect to geocode location service');
        return console.log({ err });
      }

      // if we have a valid place then the first element of features will be set
      const features = response.body.features;
      if (!features || features.length === 0) {
        return cb(`"${where}" is not a valid location`);
      }

      // we have a valid location
      const { place_name: name, center } = features[0];
      const [longitude, latitude] = center;
      const noError = undefined;
      cb(noError,
        {
          name,
          longitude,
          latitude
        });
    });
};

module.exports = geocode;