import React from "react";
import Table from "../../../components/Table";
import Meta from "../../../components/Meta";

const Brand = ({ brandFoods }) => {
  return (
    <>
      <Meta title={brandFoods[0].fields.brand_name + " Nutrition Info"} />
      <Table brandFoods={brandFoods} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  let brandFoods = [];
  let keepGoing = true;
  let offset = 0;

  let requestData = {
    appId: process.env.API_ID,
    appKey: process.env.API_KEY,
    query: "*",
    offset: offset,
    limit: 50,
    sort: {
      field: "item_name.sortable_na",
      order: "asc",
    },
    filters: {
      brand_id: context.params.id,
    },
    fields: [
      "brand_name",
      "item_name",
      "brand_id",
      "item_id",
      "nf_calories",
      "nf_total_fat",
      "nf_total_carbohydrate",
      "nf_protein",
    ],
  };

  while (keepGoing) {
    let res = await fetch("https://api.nutritionix.com/v1_1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData, (requestData.offset = offset)),
    });

    let resObj = await res.json();

    brandFoods.push.apply(brandFoods, resObj.hits);

    offset += 50;

    if (resObj.hits.length < 50) {
      keepGoing = false;
    }
  }

  return {
    props: {
      brandFoods,
    },
  };
};

export default Brand;
