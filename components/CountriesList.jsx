import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

const CountriesList = ({ query }) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,area,currencies,languages,borders"
    )
      .then((res) => res.json())
      .then((data) => setCountriesData(data));
  }, []);

  if (!countriesData.length) return <CountriesListShimmer />;

  return (
    <div className="countries-container">
      {countriesData
        .filter(
          (country) =>
            country.name.common.toLowerCase().includes(query) ||
            country.region.toLowerCase().includes(query)
        )
        .map((country) => (
          <CountryCard
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital}
            key={country.name.common}
            data={country}
          />
        ))}
    </div>
  );
};

export default CountriesList;
