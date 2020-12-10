import Head from "next/head";
import makeRequest from "../utilities/makeRequest";
import styles from "../styles/Home.module.css";
import useSwr from "swr";
import { gql } from "graphql-request";

export default function Home() {
  const { data, error } = useSwr(
    gql`
      {
        allRecipes {
          data {
            name
          }
        }
      }
    `,
    makeRequest
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Recappie!</h1>

        <p className={styles.description}>
          An app for collecting family recipes.
        </p>

        <p>{JSON.stringify(error || data)}</p>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
