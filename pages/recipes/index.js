import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import Link from "next/link";
import styles from "styles/Home.module.css";
import { getRecipes } from "pages/api/recipes";

export default function Recipes({ recipes }) {
  const getRecipeNames = ({ _id, name }) => <p key={_id}>{name}</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        <ul>
          <li>
            <Link href="/recipes/add">
              <a>Add a Recipe</a>
            </Link>
          </li>
        </ul>

        <section>{recipes.map(getRecipeNames)}</section>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const recipes = await getRecipes();

  const props = {
    recipes,
  };

  return {
    props,
  };
}
