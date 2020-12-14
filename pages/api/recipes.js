import flattenObject from "utilities/flattenObject";
import getOrCreate from "utilities/getOrCreate";
import runQuery from "utilities/runQuery";
import uniquify from "utilities/uniquify";
import { createIngredient, getIngredientIdByName } from "pages/api/ingredients";
import { createUnit, getUnitIdByName } from "pages/api/units";
import { gql } from "graphql-request";

export const getRecipes = async () => {
  const query = gql`
    {
      allRecipes {
        data {
          name
          family {
            name
          }
        }
      }
    }
  `;

  const {
    allRecipes: { data },
  } = await runQuery({
    query,
  });

  return data;
};

export const createRecipe = async (request) => {
  let { family, ingredients, measurements, name, steps, units } = JSON.parse(
    request
  );

  family = {
    connect: family,
  };

  const getValue = ({ value }) => value;

  const getUniques = (collection) =>
    uniquify(collection.map(getValue).filter(Boolean));

  const [ingredientNames, unitNames] = [ingredients, units].map(getUniques);

  const getOrCreateIngredient = getOrCreate(
    getIngredientIdByName,
    createIngredient
  );

  const ingredientMappings = await Promise.all(
    ingredientNames.map(getOrCreateIngredient)
  );

  const getOrCreateUnit = getOrCreate(getUnitIdByName, createUnit);
  const unitMappings = await Promise.all(unitNames.map(getOrCreateUnit));

  const getMap = (mappings) => mappings.reduce(flattenObject);

  const [ingredientMap, unitMap] = [ingredientMappings, unitMappings].map(
    getMap
  );

  const getIdFromMap = (map) => ({ value }) => map[value];

  const getIngredientIdFromMap = getIdFromMap(ingredientMap);
  const ingredientIds = ingredients.map(getIngredientIdFromMap);

  const getUnitIdFromMap = getIdFromMap(unitMap);
  const unitIds = units.map(getUnitIdFromMap);

  const getRecipeIngredientInput = ({ value: measurement }, i) => {
    const unit = unitIds[i];
    const ingredient = ingredientIds[i];

    return {
      ingredient: {
        connect: ingredient,
      },
      measurement: parseFloat(measurement),
      unit: {
        connect: unit,
      },
    };
  };

  const recipeIngredients = {
    create: measurements.map(getRecipeIngredientInput),
  };

  const getStepInput = ({ value: description }, order) => ({
    description,
    order,
  });

  steps = {
    create: steps.map(getStepInput),
  };

  const variables = {
    family,
    name,
    recipeIngredients,
    steps,
  };

  const query = gql`
    mutation(
      $family: RecipeFamilyRelation
      $name: String!
      $recipeIngredients: RecipeRecipeIngredientsRelation
      $steps: RecipeStepsRelation
    ) {
      createRecipe(
        data: {
          family: $family
          name: $name
          recipeIngredients: $recipeIngredients
          steps: $steps
        }
      ) {
        name
      }
    }
  `;

  const { createRecipe: data } = await runQuery({
    query,
    variables,
  });

  return data;
};

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "GET":
      const recipes = await getRecipes();
      response.statusCode = 200;
      response.send(recipes);
      break;
    case "POST":
      const recipe = await createRecipe(request.body);
      response.statusCode = 201;
      response.send(recipe);
      break;
    case "PUT":
      response.statusCode = 200;
      response.send({
        message: "recipes: put request received",
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
};
