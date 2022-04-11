import Head from "next/head";
import BrandList from "../components/BrandList";
import styles from "../styles/Layout.module.css";

export default function Home({ brands }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nutrition App</title>
        <meta name="description" content="Restaurant nutrition app" />
        <meta name="keywords" content="nutrition, calories, diet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BrandList brands={brands} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://d1gvlspmcma3iu.cloudfront.net/restaurants-3d-party.json.gz"
  );
  const brands = await res.json();

  return {
    props: {
      brands,
    },
  };
};

// `https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=${process.env.API_ID}&appKey=${process.env.API_KEY}`
