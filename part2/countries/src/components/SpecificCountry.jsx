const SpecificCountry = ({ country }) => (
    <>
        <h2>{country.name.official}</h2>
        <div>
            Capital {country.capital[0]} <br />
            Area {country.area}
        </div>
        <h3>Languages</h3>
        <ul>
            {Object.values(country.languages).map(v => <li key={v}>{v}</li>)}
        </ul>
        <img src={country.flags.png} />
    </>
)

export default SpecificCountry