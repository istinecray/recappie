import parseMeasurementString from "utilities/parseMeasurementString";

export const parseIngredientString = (ingredientString) => {
  const ingredient = ingredientString.split(" ");

  let [measurement] = ingredient;
  measurement = parseMeasurementString(measurement);

  let unit;
  let nameParts = [];

  if (ingredient.length > 2) [, unit, ...nameParts] = ingredient;
  else [, ...nameParts] = ingredient;

  const name = nameParts.join(" ");

  return {
    measurement,
    unit,
    name,
  };
};
