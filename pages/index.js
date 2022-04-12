import Head from "next/head";
import BrandList from "../components/BrandList";
import styles from "../styles/Layout.module.css";

export default function Home({ brandsData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nutrition App</title>
        <meta name="description" content="Restaurant nutrition app" />
        <meta name="keywords" content="nutrition, calories, diet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BrandList brandsData={brandsData} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://d1gvlspmcma3iu.cloudfront.net/restaurants-3d-party.json.gz"
  );
  const brandsData = await res.json();

  return {
    props: {
      brandsData,
    },
  };
};
