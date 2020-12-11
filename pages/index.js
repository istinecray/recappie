import Head from "next/head";
import Link from "next/link";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          <li>
            <Link href="/recipes">
              <a>Recipes</a>
            </Link>
          </li>
        </ul>

        <h1 className={styles.title}>Recappie</h1>

        <p className={styles.description}>
          An app for collecting family recipes.
        </p>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
