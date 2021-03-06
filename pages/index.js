import Page from "components/Page";
import styles from "styles/Page.module.css";

const Home = () => (
  <Page>
    <h2>Home</h2>
    <p className={styles.description}>An app for collecting family recipes.</p>
  </Page>
);

export default Home;
