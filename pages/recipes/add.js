import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import styles from "styles/Home.module.css";
import { getFamilies } from "pages/api/families";
import { useFieldArray, useForm } from "react-hook-form";

export default function Home({ families }) {
  const getDefaultFields = (all, name) => ({
    ...all,
    [name]: [
      {
        value: "",
      },
    ],
  });

  const defaultValues = ["ingredients", "steps"].reduce(getDefaultFields, {});

  const { control, errors, handleSubmit, register } = useForm({
    defaultValues,
  });

  const getFieldArray = (name) =>
    useFieldArray({
      control,
      name,
    });

  const [
    { fields: ingredientFields, append: appendIngredient },
    { fields: stepFields, append: appendStep },
  ] = ["ingredients", "steps"].map(getFieldArray);

  const getFamily = ({ _id, name }) => (
    <option key={_id} value={_id}>
      {name}
    </option>
  );

  const getIngredient = ({ id }, i) => (
    <li key={id}>
      <input name={`ingredients[${i}].value`} ref={register()} type="text" />
    </li>
  );

  const getStep = ({ id }, i) => (
    <li key={id}>
      <textarea name={`steps[${i}].value`} ref={register()} />
    </li>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Add Recipe</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        <h2>Add a Recipe</h2>

        <form onSubmit={handleSubmit((form) => alert(JSON.stringify(form)))}>
          <label>
            <div>Family</div>

            <select name="recipeFamily" ref={register()}>
              {families.map(getFamily)}
            </select>
          </label>

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

          <fieldset>
            <legend>Ingredients</legend>
            <ul>{ingredientFields.map(getIngredient)}</ul>
            <button onClick={appendIngredient} type="button">
              +
            </button>
          </fieldset>

          <fieldset>
            <legend>Steps</legend>
            <ol>{stepFields.map(getStep)}</ol>
            <button onClick={appendStep} type="button">
              +
            </button>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
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
