import Page from "components/Page";
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
    <Page title="Recipes">
      <h2>Recipes</h2>

      <section>{recipes.map(getRecipeNames)}</section>
    </Page>
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
