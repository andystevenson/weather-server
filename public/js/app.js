console.log('browser app.js...');

const form = document.querySelector('form');
const locations = document.querySelector('.locations');

const li = ({ name, forecast }) => {
  const el = document.createElement('li');
  el.classList.add('location');
  el.innerHTML = `${name}<br>${forecast}`;
  locations.prepend(el);
};

const liError = ({ err, address }) => {
  const el = document.createElement('li');
  el.classList.add('error');
  el.innerHTML = `${address}<br>${err}`;
  locations.prepend(el);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = form.location.value;

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
      response.json()
        .then(data => {
          console.log({ data });
          if (data.error) {
            liError(data.error);
            return;
          }

          li(data);
        });
    });
});
