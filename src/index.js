import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};


refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(evt) {
  const querySearch = evt.target.value.trim();

  if (!querySearch) return;

  markupClear();
  fetchCountries(querySearch).then(createMarkup).catch(onError);
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}

function createMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countries.length >= 2 && countries.length < 10) {
    renderListCountries(countries);
  }

  if (countries.length === 1) {
    renderCountryInfo(countries);
  }
}

function renderListCountries(countries) {
  markupClear();
  const markup = countries
    .map(
      country =>
        `<li style="font-size:18px">
        <img src="${country.flags.svg}" alt="Flag ${country.name.official}">
        <p>
          ${country.name.official}
        </p>
      </li>`
    )
    .join('');
  refs.countryList.innerHTML = markup;
}

function renderCountryInfo(countries) {
  const markup = `<p style="font-size:34px; display:flex; gap:20px;"><img src="${
    countries[0].flags.svg
  }" alt="Flag ${countries[0].name.official}"/><b> ${
    countries[0].name.official
  }</b></p>
<p><b>Capital:</b> ${countries[0].capital}</p>
<p><b>Population:</b> ${countries[0].population}</p>
<p><b>Languages:</b> ${Object.values(countries[0].languages)}</p>
`;
  refs.countryInfo.innerHTML = markup;
}

function markupClear() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}