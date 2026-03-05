import footerStyles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      Powered by <a href="https://platform.fatsecret.com">FatSecret Platform API</a>
    </footer>
  );
};

export default Footer;
