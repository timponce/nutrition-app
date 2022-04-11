import footerStyles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      Powered by <a href="https://nutritionix.com/api">Nutritionix API </a>
    </footer>
  );
};

export default Footer;
