const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER_RESPONSE = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?${FILTER_RESPONSE}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}