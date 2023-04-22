import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

searchEl.addEventListener(
  'input',
  debounce(async ev => {
    const countryName = ev.target.value;
    const countries = await fetchCountries(countryName);

    if (countryName === '') {
      countryListEl.innerHTML = '';
      countryInfoEl.innerHTML = '';
      return;
    }

    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (countries.length === undefined) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    } else {
      countryListEl.innerHTML = countries
        .map(
          country =>
            `<li><img height ='20' width = '30' src='${country.flags.png}'/>${country.name.common}</li>`
        )
        .join('');
    }

    if (countries.length === 1) {
      countryInfoEl.innerHTML = `
    <p>Capital: ${countries[0].capital}</p>
    <p>Population: ${countries[0].population}</p>
    <p>Languages: ${Object.values(countries[0].languages).join(', ')}</p>
    `;
    }
    countries.capital.style = 'font-weight:700';
    console.log(countries);
  }, DEBOUNCE_DELAY)
);
