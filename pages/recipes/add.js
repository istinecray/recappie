import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import styles from "styles/Home.module.css";
import { getFamilies } from "pages/api/families";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function Home({ families }) {
  const { control, errors, handleSubmit, register } = useForm();

  const getFieldArray = (name) =>
    useFieldArray({
      control,
      name,
    });

  const [
    { fields: ingredientFields, append: appendIngredient },
    { fields: stepFields, append: appendStep },
  ] = ["ingredients", "steps"].map(getFieldArray);

  useEffect(() => {
    const hasLength = ({ length }) => length;

    if (![ingredientFields, stepFields].every(hasLength)) {
      appendIngredient();
      appendStep();
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Recappie | Add Recipe</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <form onSubmit={handleSubmit((form) => alert(JSON.stringify(form)))}>
          <label>
            <div>Family</div>

            <select name="recipeFamily" ref={register}>
              {families.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
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

          <div>
            <div>Ingredients</div>

            <ul>
              {ingredientFields.map(({ id }, i) => (
                <li key={id}>
                  <input
                    name={`ingredients[${i}].text`}
                    ref={register}
                    type="text"
                  />
                </li>
              ))}
            </ul>

            <button onClick={appendIngredient} type="button">
              +
            </button>
          </div>

          <div>
            <div>Steps</div>

            <ol>
              {stepFields.map(({ id }, i) => (
                <li key={id}>
                  <textarea name={`steps[${i}].text`} ref={register} />
                </li>
              ))}
            </ol>

            <button onClick={appendStep} type="button">
              +
            </button>
          </div>

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
