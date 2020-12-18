import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import Link from "next/link";
import styles from "styles/Home.module.css";
import { getRecipes } from "pages/api/recipes";

const Recipes = ({ recipes }) => {
  const getRecipeIngredients = ({ _id, ingredient, measurement, unit }) => (
    <li key={_id}>
      {measurement} {unit?.name} {ingredient.name}
    </li>
  );

  const getStep = ({ _id, description }) => <li key={_id}>{description}</li>;

  const getRecipeNames = ({ _id, family, name, recipeIngredients, steps }) => (
    <article key={_id}>
      <h3>
        {name} ({family.name})
      </h3>

      <ul>{recipeIngredients.data.map(getRecipeIngredients)}</ul>
      <ol>{steps.data.map(getStep)}</ol>
    </article>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        <h2>Recipes</h2>

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
};

export async function getServerSideProps() {
  const recipes = await getRecipes();

  const props = {
    recipes,
  };

  return {
    props,
  };
}

export default Recipes;
