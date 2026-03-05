import BrandItem from "./BrandItem";
import Announcer from "./Announcer";
import React from "react";
import brandStyles from "../styles/Brand.module.css";

const BrandList = ({ brandsData }) => {
  const [searchText, setSearchText] = React.useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredBrands = brandsData.filter((el) => {
    if (searchText === "") return true;
    return el.name.toLowerCase().includes(searchText);
  });

  return (
    <>
      <br />
      <input
        className={brandStyles.input}
        placeholder="Search"
        onChange={handleChange}
        value={searchText}
      ></input>
      <br />
      <div className={brandStyles.grid}>
        {filteredBrands.map((brand) => (
          <BrandItem brand={brand} key={brand.slug} />
        ))}
      </div>
      <Announcer
        message={`There are ${filteredBrands.length} brands to choose from.`}
      />
    </>
  );
};

export default BrandList;
