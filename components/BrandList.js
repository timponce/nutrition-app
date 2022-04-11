import BrandItem from "./BrandItem";
import brandStyles from "../styles/Brand.module.css";

const BrandList = ({ brands }) => {
  return (
    <div className={brandStyles.grid}>
      {brands.map((brand) => (
        <BrandItem brand={brand} key={brand.id} id={brand.id} />
      ))}
    </div>
  );
};

export default BrandList;
