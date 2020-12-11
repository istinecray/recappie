import Head from "next/head";
import Footer from "components/Footer";
import Header from "components/Header";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        <p className={styles.description}>
          An app for collecting family recipes.
        </p>
      </main>

      <Footer />
    </div>
  );
}
