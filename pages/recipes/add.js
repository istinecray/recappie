import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import styles from "styles/Home.module.css";
import { getFamilies } from "pages/api/families";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";

export default function Home({ families }) {
  const [ingredientCount, setIngredientCount] = useState(1);

  const getDefaultFields = (all, name) => ({
    ...all,
    [name]: [
      {
        value: "",
      },
    ],
  });

  const defaultValues = [
    "recipeIngredients",
    "recipeMeasurements",
    "recipeSteps",
    "recipeUnits",
  ].reduce(getDefaultFields, {});

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
    { fields: measurementFields, append: appendMeasurement },
    { fields: stepFields, append: appendStep },
    { fields: unitFields, append: appendUnit },
  ] = [
    "recipeIngredients",
    "recipeMeasurements",
    "recipeSteps",
    "recipeUnits",
  ].map(getFieldArray);

  const appendIngredientFields = () => {
    setIngredientCount(ingredientCount + 1);
    appendIngredient();
    appendMeasurement();
    appendUnit();
  };

  const getFamily = ({ _id, name }) => (
    <option key={_id} value={_id}>
      {name}
    </option>
  );

  const getFieldForIndex = (i) => (fields) => fields[i];

  const getId = ({ id }) => id;

  const getIngredient = (_, i) => {
    const getField = getFieldForIndex(i);

    const [ingredient, measurement, unit] = [
      ingredientFields,
      measurementFields,
      unitFields,
    ].map(getField);

    const ids = [ingredient, measurement, unit].map(getId);
    const id = ids.join("-");

    return (
      <li key={id}>
        <input
          name={`recipeMeasurement[${i}].value`}
          ref={register()}
          type="number"
        />

        <input name={`recipeUnit[${i}].value`} ref={register()} type="text" />

        <input
          name={`recipeIngredients[${i}].value`}
          ref={register()}
          type="text"
        />
      </li>
    );
  };

  const getStep = ({ id }, i) => (
    <li key={id}>
      <textarea name={`recipeSteps[${i}].value`} ref={register()} />
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
            <ul>{Array(ingredientCount).fill(null).map(getIngredient)}</ul>
            <button onClick={appendIngredientFields} type="button">
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
