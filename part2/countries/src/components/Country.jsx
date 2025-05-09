const Country = ({ country }) => (
    <>
        <h2>{country.name.official}</h2>
        <div>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
        </div>
    </>
)

export default Country