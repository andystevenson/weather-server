console.log('browser app.js...');

const form = document.querySelector('form');
const locations = document.querySelector('.locations');

const li = ({ name, forecast }) => {
  const el = document.createElement('li');
  el.classList.add('location');
  const { icon, weather } = forecast;
  console.log({ forecast });
  el.style.backgroundImage = `url(${icon})`;
  el.innerHTML = `${name}<br>${weather}`;

  // el.style.listStyleImage = `url('${icon}')`;
  // el.style.listStylePosition = 'inside';
  console.log({ el });
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

  fetch(`/weather?address=${location}`)
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
