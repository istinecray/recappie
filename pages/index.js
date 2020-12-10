import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home(props) {
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

        <p>{JSON.stringify(props.recipes.data.map(({ data }) => data))}</p>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const url = [process.env.BASE_URL, "api", "hello"].join("/");
  const response = await fetch(url);
  const data = await response.json();

  return data
    ? {
        props: data.recipes,
      }
    : {
        notFound: true,
      };
}
