import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Notification from './components/Notification'
import SpecificCountry from './components/SpecificCountry'
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

        // Filter countries
        const filteredCountries = countries.filter(country =>
            country.name.official.toLowerCase().includes(searchValue.toLowerCase())
        )
        setCountriesShow(filteredCountries)

        // Check if its only one
        if (filteredCountries.length === 1) {
            getSpecificCountry(filteredCountries[0].name.common)
        } else {
            setSpecificCountry(null)
        }

    }

    const handleShowClick = (name) => {
        getSpecificCountry(name)

    }

    const getSpecificCountry = (countryName) => {
        countriesService.getCountriesByName(countryName)
            .then(response => {
                console.log("response");

                setSpecificCountry(response)
                setCountriesShow([response])
            })
    }

    let content
    if (countriesShow.length > 10) {
        content = <Notification message="Too many matches, specify another filter" />
    } else if (countriesShow.length === 1 && specificCountry) {
        content = <SpecificCountry country={specificCountry} />
    } else if (countriesShow.length === 0) {
        content = <div>Country not found</div>
    } else {
        content = countriesShow.map(c =>
            <Country
                key={c.name.official}
                name={c.name.official}
                onShowClick={() => handleShowClick(c.name.official)} />
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
