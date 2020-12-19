import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import getJson from "utilities/getJson";
import styles from "styles/Home.module.css";
import { getFamilies } from "pages/api/families";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import AddFamily from "pages/families/add";

const AddRecipe = ({ families }) => {
  const [ingredientCount, setIngredientCount] = useState(1);
  const [message, setMessage] = useState(null);

  const onSubmit = async (form) => {
    try {
      const { name } = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify(form),
      }).then(getJson);

      setMessage(`Created ${name} recipe :)`);
    } catch (e) {
      console.error(e);
      setMessage(`Couldn't create this recipe :(`);
    }
  };

  const getDefaultFields = (all, name) => ({
    ...all,
    [name]: [
      {
        value: "",
      },
    ],
  });

  const defaultValues = [
    "ingredients",
    "measurements",
    "steps",
    "units",
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
  ] = ["ingredients", "measurements", "steps", "units"].map(getFieldArray);

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
          min="0"
          name={`measurements[${i}].value`}
          ref={register()}
          step="any"
          type="number"
        />

        <input name={`units[${i}].value`} ref={register()} type="text" />

        <input name={`ingredients[${i}].value`} ref={register()} type="text" />
      </li>
    );
  };

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

        {message}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <div>Family</div>

            <select name="family" ref={register()}>
              {families.map(getFamily)}
            </select>
          </label>

          <label>
            <div>Recipe Name</div>

            <input
              name="name"
              ref={register({
                required: true,
              })}
              type="text"
            />

            {errors.name && <div>Recipe Name is a required field.</div>}
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
};

export async function getStaticProps() {
  const families = await getFamilies();

  const props = {
    families,
  };

  return {
    props,
  };
}

export default AddFamily;
