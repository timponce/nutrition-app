import Link from "next/link";
import brandStyles from "../styles/Brand.module.css";

const BrandItem = ({ brand }) => {
  return (
    <Link href="/brand/[slug]" as={`/brand/${brand.slug}`}>
      <a className={brandStyles.card}>
        <h3>{brand.name} &rarr;</h3>
      </a>
    </Link>
  );
};

export default BrandItem;
