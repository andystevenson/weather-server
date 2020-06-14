const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// set up express

const app = express();

// set up required paths
const root = path.join(__dirname, '../public');
const partials = path.join(__dirname, '../views/partials');

console.log({ root });

const port = 3000;

// configure handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(partials);

// set up static/public path to serve from
app.use(express.static(root));

app.get('', (req, res) => {
  res.render('index', { title: 'hello world', name: 'Andy' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'about world', name: 'Andy' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help world...', help: 'helpful words,... ', name: 'Andy'
  });
});

app.get('/weather', (req, res) => {
  const { query } = req;
  console.log({ query });
  const { address } = query;
  if (!address) {
    return res.send({ error: 'You must provide "address="' });
  }

  geocode(address, (err, { name, latitude, longitude } = {}) => {
    if (err) return res.send({ error: { err, address } });

    forecast(latitude, longitude, (err, forecast) => {
      if (err) return res.send({ error: { err, forecast } });
      res.send({ address, name, latitude, longitude, forecast });
    });
  });

});

app.get('/products', (req, res) => {
  const { query } = req;
  console.log({ query });
  if (!query.search) {
    return res.send({ error: 'You must provide a search key.' });
  }
  const products = {
    products: []
  };
  res.send(products);
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'help error page', error: 'Help article not found!', name: 'Andy'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'help error page', error: 'Page not found.', name: 'Andy'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});