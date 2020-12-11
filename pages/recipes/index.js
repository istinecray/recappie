import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import fetcher from "utilities/fetcher";
import styles from "styles/Home.module.css";
import useSwr from "swr";

export default function Home() {
  const { data, error } = useSwr(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`,
    fetcher
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <p>
          {![data, error].some(Boolean) && "Loading..."}
          {JSON.stringify(error || data)}
        </p>
      </main>

      <Footer />
    </div>
  );
}
