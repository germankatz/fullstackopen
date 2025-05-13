import axios from 'axios'

const URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
    const request = axios.get(URL + '/all')
    return request.then(response => response.data)
}

const getCountriesByName = (name) => {
    const request = axios.get(`${URL}/name/${name}`)
    return request.then(response => response.data)
}

export default { getCountriesByName, getAllCountries }