# Nutrition App

![Screengrab of app's homepage and search function](/public/screenshots/nutrition-app-screenshot-search.png?raw=true)

![Screengrab of app's nutrition data](/public/screenshots/nutrition-app-screenshot-table-sort.png?raw=true)

## [See it in action](https://powerful-plateau-95151.herokuapp.com/)

## Project Summary

This nutrition app allows a user to view and sort nutrition facts from over 800 unique restaurants to make informed choices about what they are eating.

After searching for a particular restaurant, one can navigate to their page and view the entire menu of options in an organized table. In addition, the user can click on each category heading to sort the data in the category for easy viewing.

The data for this project was made available by NutritionixAPI.

## Project Details

I learned the following from this project:
1. The basics of NextJS
   - getStaticProps to load all available restaurants at build time
   - getServerSideProps to fetch and render the data specific to each restaurant at request time
   - Dynamic page routing
   - The role of NextJS in enhancing search engine optimization
   - Component level CSS
 2. Fetching and using data from a public API (NutritionixAPI)

I would like to implement and improve the following:
1. Allow user to filter the nutrition data (e.g. only show items between 300-600 calories)

I used the following technologies to complete my app:
- NextJS - React framework
- React - JavaScript library
- Heroku - cloud platform as a service
- Git - version control system
