//Variables constantes
const countriesElement = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const buscarElement = document.getElementById('search');
const modal = document.getElementById('modal');
const cerrarBtn = document.getElementById('cerrar');

//acceso API de países
getCountries();

async function getCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  displayCountries(countries);
}

//mostrar lista países con banderas
function displayCountries(countries) {
  countriesElement.innerHTML = '';

  countries.forEach(country => {
    const countryElement = document.createElement('div'); 
    countryElement.classList.add('card'); //añadimos cada país a lista

    countryElement.innerHTML = `
            <div>
                <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
                <p>
                    <strong>Idiomas:</strong>
                    ${country.languages.map(language => language.name)}
                </p>                              
                <p>
                  <strong>Moneda:</sx trong>
                  ${country.currencies.map(currency => currency.code)}
                </p>        
                <p>
                    <strong>Habitantes:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Región:</strong>
                    ${country.region}
                </p>
            </div>
        `;

    countryElement.addEventListener('click', () => {
      modal.style.display = 'flex';
      mostrarDetalles(country);
    });

    countriesElement.appendChild(countryElement);
  });
}

function mostrarDetalles(country) {
  const modalBody = modal.querySelector('.modal-body');
  const modalBandera = modal.querySelector('img');

  modalBandera.src = country.flag;

  modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Nombre en su lengua:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Habitantes:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Región:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Región:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Dominio Web:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Moneda:</strong>
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p>
            <strong>Idiomas:</strong>
            ${country.languages.map(language => language.name)}
        </p>
    `;
}

//Para la busqueda
buscarElement.addEventListener('input', e => {
  const { value } = e.target;
  const countryName = document.querySelectorAll('.country-name');

  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'block';
    } else {
      name.parentElement.parentElement.style.display = 'none';
    }
  });
});

// cerrar ventana
cerrarBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});



