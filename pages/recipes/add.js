import Head from "next/head";
import styles from "styles/Home.module.css";
import { useForm } from "react-hook-form";

export default function Home() {
  const { errors, handleSubmit, register } = useForm();

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Recappie</h1>

        <form onSubmit={handleSubmit(console.log)}>
          <label>
            <div>Recipe Name</div>

            <input
              name="recipeName"
              ref={register({
                required: true,
              })}
              type="text"
            />

            {errors.recipeName && <div>Recipe Name is a required field.</div>}
          </label>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
