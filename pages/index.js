import BrandList from "../components/BrandList";
import styles from "../styles/Layout.module.css";
import brands from "../data/brands.json";

export default function Home({ brandsData }) {
  return (
    <div className={styles.container}>
      <BrandList brandsData={brandsData} />
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      brandsData: brands,
    },
  };
};
