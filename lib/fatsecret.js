const crypto = require("crypto");

function rfc3986Encode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) =>
    "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

function generateOAuthParams() {
  return {
    oauth_consumer_key: process.env.FATSECRET_CONSUMER_KEY,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_version: "1.0",
  };
}

function sign(method, url, params) {
  const sortedParams = Object.keys(params)
    .sort()
    .map((k) => `${rfc3986Encode(k)}=${rfc3986Encode(params[k])}`)
    .join("&");

  const baseString = [
    method.toUpperCase(),
    rfc3986Encode(url),
    rfc3986Encode(sortedParams),
  ].join("&");

  const signingKey = `${rfc3986Encode(
    process.env.FATSECRET_CONSUMER_SECRET
  )}&`;

  return crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");
}

async function apiCall(methodName, extraParams = {}) {
  const url = "https://platform.fatsecret.com/rest/server.api";
  const params = {
    method: methodName,
    format: "json",
    ...generateOAuthParams(),
    ...extraParams,
  };

  params.oauth_signature = sign("GET", url, params);

  const qs = Object.entries(params)
    .map(([k, v]) => `${rfc3986Encode(k)}=${rfc3986Encode(v)}`)
    .join("&");

  const res = await fetch(`${url}?${qs}`);
  return res.json();
}

function parseDescription(desc) {
  const cal = desc.match(/Calories:\s*([\d.]+)/);
  const fat = desc.match(/Fat:\s*([\d.]+)/);
  const carbs = desc.match(/Carbs:\s*([\d.]+)/);
  const protein = desc.match(/Protein:\s*([\d.]+)/);

  return {
    nf_calories: cal ? parseFloat(cal[1]) : 0,
    nf_total_fat: fat ? parseFloat(fat[1]) : 0,
    nf_total_carbohydrate: carbs ? parseFloat(carbs[1]) : 0,
    nf_protein: protein ? parseFloat(protein[1]) : 0,
  };
}

async function searchBrandFoods(brandName, maxItems = 200) {
  let allFoods = [];
  let page = 0;
  const perPage = 50;
  const maxPages = Math.ceil(maxItems / perPage);

  while (page < maxPages) {
    const data = await apiCall("foods.search", {
      search_expression: brandName,
      food_type: "Brand",
      max_results: perPage.toString(),
      page_number: page.toString(),
    });

    const foods = data?.foods?.food;
    if (!foods) break;

    const foodList = Array.isArray(foods) ? foods : [foods];

    const matching = foodList.filter(
      (f) => f.brand_name?.toLowerCase() === brandName.toLowerCase()
    );

    allFoods.push(...matching);

    if (foodList.length < perPage) break;
    page++;
  }

  return allFoods.map((f) => ({
    food_id: f.food_id,
    brand_name: f.brand_name,
    item_name: f.food_name,
    ...parseDescription(f.food_description || ""),
  }));
}

module.exports = { apiCall, searchBrandFoods, parseDescription };
