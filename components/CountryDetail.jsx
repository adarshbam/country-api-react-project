import { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import useTheme from "../contexts/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

const CountryDetail = () => {
  const params = useParams();
  const { state } = useLocation();
  const countryName = params.country;
  const [isDark] = useTheme();

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  function updateCountryData(country) {
    setCountryData({
      name: country?.name?.common,
      nativeName: Object.values(country?.name?.nativeName)[0]?.common,
      population: country?.population?.toLocaleString("en-IN"),
      region: country.region,
      subregion: country?.subregion,
      capital: country?.capital,
      flag: country?.flags?.svg,
      tld: country?.tld,
      currencies: Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", "),
      languages: Object.values(country.languages).join(", "),
      borders: [],
    });

    if (country.borders)
      Promise.all(
        country.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => borderCountry.name.common);
        })
      ).then((borders) => {
        setTimeout(() => {
          setCountryData((prevState) => ({ ...prevState, borders }));
        });
      });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([country]) => {
        console.log(country);
        updateCountryData(country);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <h1>Country Not Found!</h1>;
  }

  return (
    <main className={isDark ? "dark" : ""}>
      <div className="country-details-container">
        <span
          className="back-button"
          onClick={() => {
            history.back();
            console.log("back");
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
          &nbsp; Back
        </span>
        {countryData == null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={`flag-${countryName}`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: {countryData.nativeName}</b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>Population: {countryData.population}</b>
                  <span className="population"></span>
                </p>
                <p>
                  <b>Region: {countryData.region}</b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryData.subregion}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>Capital: {countryData?.capital?.join(", ")}</b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {countryData.tld}</b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryData.currencies}</b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b>Languages: {countryData.languages}</b>
                  <span className="languages"></span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => (
                    <Link to={`/${border}`} key={border}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CountryDetail;
