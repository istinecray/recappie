import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Recappie!
        </h1>

        <p className={styles.description}>
          An app for collecting family recipes.
        </p>
      </main>

      <footer className={styles.footer}>
          &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
