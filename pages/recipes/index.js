import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import Link from "next/link";
import styles from "styles/Home.module.css";
import { getFamilies } from "pages/api/families";

export default function Home({ families }) {
  const getName = ({ name }) => name;

  const getFamilyRecipes = ({ _id, name, recipes }) => (
    <p key={_id}>
      <b>{name}</b>: {recipes.data.map(getName).join(" ")}
    </p>
  );

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

        <section>{families.map(getFamilyRecipes)}</section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const families = await getFamilies();

  const props = {
    families,
  };

  return {
    props,
  };
}
