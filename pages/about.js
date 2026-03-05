import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>About</h2>
      <p>
        A simple tool for viewing and comparing nutrition facts from popular
        restaurant chains. Search for a restaurant, then sort menu items by
        calories, protein, carbs, fat, or protein ratio to make informed choices.
      </p>

      <h3>How to Use</h3>
      <ul>
        <li>Search or browse restaurants on the home page</li>
        <li>Click a restaurant to see its full menu with nutrition data</li>
        <li>Click any column header to sort (click again to reverse)</li>
      </ul>

      <h3>Built With</h3>
      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>FatSecret Platform API</li>
        <li>Heroku</li>
      </ul>

      <p>
        Made by <a href="https://timponce.com">Tim Ponce</a>
      </p>
    </div>
  );
};

export default About;
