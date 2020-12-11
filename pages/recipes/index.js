import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import Link from "next/link";
import styles from "styles/Home.module.css";
import { getRecipes } from "pages/api/recipes";

export default function Home({ recipes }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <ul>
          <li>
            <Link href="/recipes/add">
              <a>Add a Recipe</a>
            </Link>
          </li>
        </ul>

        <p>{JSON.stringify(recipes)}</p>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await getRecipes();

  const props = {
    recipes,
  };

  return {
    props,
  };
}
