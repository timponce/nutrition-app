import BrandItem from "./BrandItem";
import React from "react";
import brandStyles from "../styles/Brand.module.css";

const BrandList = ({ brandsData }) => {
  const [brands, setBrands] = React.useState(brandsData);
  const [searchText, setSearchText] = React.useState("");

  const handleChange = (e) => {
    let userInput = e.target.value.toLowerCase();
    setSearchText(userInput);
  };

  const filteredData = brands.filter((el) => {
    if (searchText === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(searchText);
    }
  });

  console.table(brands);

  return (
    <>
      <br />
      <input
        className={brandStyles.input}
        placeholder="Search"
        onChange={(e) => handleChange(e)}
        value={searchText}
      ></input>
      <br />
      <div className={brandStyles.grid}>
        {filteredData.map((brand) => (
          <BrandItem brand={brand} key={brand.id} id={brand.id} />
        ))}
      </div>
    </>
  );
};

export default BrandList;
