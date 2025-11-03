import { useState } from "react";
import Searchbar from "./Searchbar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import useTheme from "../contexts/useTheme";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme();

  return (
    <main className={isDark ? "dark" : ""}>
      <div className="search-filter-container">
        <Searchbar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      <CountriesList query={query} />
    </main>
  );
};

export default Home;
