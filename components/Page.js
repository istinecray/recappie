import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import styles from "styles/Page.module.css";

const Page = ({ children, title }) => (
  <div className={styles.container}>
    <Head>
      <title>Recappie{title && `| ${title}`}</title>
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <Header />

      {children}
    </main>

    <Footer />
  </div>
);

export default Page;
