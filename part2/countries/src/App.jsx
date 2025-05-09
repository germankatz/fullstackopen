import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Notification from './components/Notification'
import Country from './components/Country'

function App() {
    const [searchText, setSearchText] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesShow, setCountriesShow] = useState([])
    const [specificCountry, setSpecificCountry] = useState(null)

    useEffect(() => {
        countriesService.getAllCountries()
            .then(response => {
                setCountries(response)
            })
    }, [])

    const handleSearchBox = (e) => {
        e.preventDefault()
        const searchValue = e.target.value
        setSearchText(searchValue)

        // Filtrar paises
        const filteredCountries = countries.filter(country =>
            country.name.official.toLowerCase().includes(searchText.toLowerCase())
        )
        setCountriesShow(filteredCountries)

        // Check if its only one
        if (filteredCountries.length === 1) {
            getSpecificCountry()
        }
    }

    const getSpecificCountry = () => {
        console.log("Busco a ", countriesShow[0]);
        countriesService.getCountriesByName(countriesShow[0].name.common)
            .then(response => {
                console.log("Busqué especifico");

                setSpecificCountry(response)
            })
    }

    let content
    if (countriesShow.length > 10) {
        content = <Notification message="Too many matches, specify another filter" />
    } else if (countriesShow.length === 1 && specificCountry) {
        content = <Country country={specificCountry} />
    } else if (countriesShow.length === 0) {
        content = null
    } else {
        content = countriesShow.map(c =>
            <div key={c.name.official}>{c.name.official}</div>
        )
    }



    return (
        <>
            <div>
                find countries: <input type='text' value={searchText} onChange={handleSearchBox} />
            </div>
            {content}

        </>
    )
}

export default App
