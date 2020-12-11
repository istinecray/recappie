import Head from "next/head";
import styles from "styles/Home.module.css";
import fetcher from "utilities/fetcher";
import useSwr from "swr";

export default function Home() {
  const { data, error } = useSwr(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`,
    fetcher
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Recappie</h1>

        <p>
          {![data, error].some(Boolean) && "Loading..."}
          {JSON.stringify(error || data)}
        </p>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}