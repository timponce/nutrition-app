import React from "react";
import Table from "../../components/Table";
import Meta from "../../components/Meta";
import brands from "../../data/brands.json";
import { searchBrandFoods } from "../../lib/fatsecret";

const Brand = ({ brandFoods, brandName }) => {
  if (!brandFoods || brandFoods.length === 0) {
    return (
      <>
        <Meta title={`${brandName} - No Results`} />
        <h2>No nutrition data found for {brandName}</h2>
      </>
    );
  }

  return (
    <>
      <Meta title={brandFoods[0].brand_name + " Nutrition Info"} />
      <Table brandFoods={brandFoods} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return { notFound: true };
  }

  const brandFoods = await searchBrandFoods(brand.name);

  return {
    props: {
      brandFoods,
      brandName: brand.name,
    },
  };
};

export default Brand;
