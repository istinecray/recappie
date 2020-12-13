import { gql } from "graphql-request";
import runQuery from "utilities/runQuery";

export const getIngredientIdByName = async (name) => {
  const query = gql`
    query($name: String!) {
      getIngredientIdByName(name: $name) {
        _id
      }
    }
  `;

  const variables = {
    name,
  };

  const { getIngredientIdByName: result } = await runQuery({
    query,
    variables,
  });

  let data = null;
  if (result) ({ _id: data } = result);

  return data;
};

export const createIngredient = async (request) => {
  const variables = JSON.parse(request);

  const query = gql`
    mutation($name: String!) {
      createIngredient(data: { name: $name }) {
        _id
      }
    }
  `;

  const {
    createIngredient: { _id },
  } = await runQuery({
    query,
    variables,
  });

  return _id;
};
