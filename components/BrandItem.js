import Link from "next/link";
import brandStyles from "../styles/Brand.module.css";

const BrandItem = ({ brand }) => {
  return (
    <Link href="/brand/[id]" as={`/brand/${brand.id}`}>
      <a className={brandStyles.card}>
        <h3>{brand.name} &rarr;</h3>
      </a>
    </Link>
  );
};

export default BrandItem;
