import styles from "styles/Page.module.css";

const Footer = () => (
  <footer className={styles.footer}>&copy; {new Date().getFullYear()}</footer>
);

export default Footer;
