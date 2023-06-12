import axios from 'axios';

const url = 'https://restcountries.com/v3.1';

function getData() {
  return axios.get(`${url}/all`).then((res) => res.data);
}

export const dataService = {
  getData,
};
