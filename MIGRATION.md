# Migration: Nutritionix to FatSecret Platform API

## Why

The Nutritionix v1.1 API (`api.nutritionix.com`) was shut down — the domain no longer resolves. Their v2 API exists but pricing starts at $500/month with no free/student tier.

## What Changed

### API Provider
- **Before:** Nutritionix v1.1 REST API with `appId`/`appKey` in request body
- **After:** FatSecret Platform API with OAuth 1.0 HMAC-SHA1 signed requests

### Environment Variables
- **Before:** `API_ID`, `API_KEY` (Nutritionix credentials)
- **After:** `FATSECRET_CONSUMER_KEY`, `FATSECRET_CONSUMER_SECRET` (FatSecret OAuth 1.0 credentials)

### Homepage (Restaurant List)
- **Before:** Fetched 800+ restaurants from a Nutritionix CDN endpoint (`d1gvlspmcma3iu.cloudfront.net`) at build time. Each restaurant had a Nutritionix-specific brand ID.
- **After:** Static curated list of 50 popular restaurant brands in `data/brands.json`. No API calls on the homepage. Brands are sorted A-Z with client-side search filtering.

### Brand Detail Page
- **Before:** Route `/brand/[id]` using Nutritionix brand IDs. Fetched menu items via POST to `api.nutritionix.com/v1_1/search` with brand ID filter.
- **After:** Route `/brand/[slug]` using URL-friendly slugs. Searches FatSecret `foods.search` method with brand name + `food_type=Brand` filter. OAuth 1.0 signing handled in `lib/fatsecret.js`.

### Data Shape
- **Before:** Nutritionix returned `hits[].fields` with `nf_calories`, `nf_protein`, `nf_total_fat`, `nf_total_carbohydrate` as numeric fields.
- **After:** FatSecret returns `food_description` as a string (e.g. `"Per 1 serving - Calories: 590kcal | Fat: 34.00g | Carbs: 45.00g | Protein: 25.00g"`). This is parsed server-side into the same numeric fields the Table component expects.

### Routing
- **Before:** `/brand/513fbc1283aa2dc80c000002` (Nutritionix brand ID)
- **After:** `/brand/mcdonalds` (readable slug)

## New Files
- `lib/fatsecret.js` — OAuth 1.0 request signing and API helper
- `data/brands.json` — curated list of restaurant brands with slugs
- `pages/brand/[slug].js` — brand detail page using FatSecret

## Removed Files
- `pages/brand/[id]/index.js` — old Nutritionix brand page

## API Rate Limits
FatSecret free tier allows 5,000 API calls per day. Optimizations:
- Homepage uses zero API calls (static brand list)
- Each brand page view uses 1-4 API calls (paginated, max 200 items)
- No client-side API calls — all data fetched server-side in `getServerSideProps`

## Setup
1. Create a FatSecret developer account at https://platform.fatsecret.com
2. Create an application to get OAuth 1.0 credentials
3. Add to `.env`:
   ```
   FATSECRET_CONSUMER_KEY=your_consumer_key
   FATSECRET_CONSUMER_SECRET=your_consumer_secret
   ```
4. Requires Node 18 (`.nvmrc` included — use `fnm` or `nvm` for auto-switching)

## Adding Brands
To add a new restaurant, append to `data/brands.json`:
```json
{ "name": "Exact FatSecret Brand Name", "slug": "url-friendly-slug" }
```
The `name` must match the `brand_name` field returned by FatSecret's API exactly.
