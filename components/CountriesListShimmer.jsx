import "./CountriesListShimmer.css";

const CountriesListShimmer = () => {
  return (
    <div className="countries-container">
      {Array.from({ length: 10 }).map((card, i) => (
        <div className="country-card shimmer-card" key={i}>
          <div className="flag-container"></div>
          <div className="card-text">
            <h1 className="card-title"></h1>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountriesListShimmer;
