import { gql } from "graphql-request";
import runQuery from "utilities/runQuery";

export const getUnitIdByName = async (name) => {
  const query = gql`
    query($name: String!) {
      getUnitIdByName(name: $name) {
        _id
      }
    }
  `;

  const variables = {
    name,
  };

  const { getUnitIdByName: result } = await runQuery({
    query,
    variables,
  });

  let data = null;
  if (result) ({ _id: data } = result);

  return data;
};

export const createUnit = async (request) => {
  console.log(request);
  const variables = JSON.parse(request);

  const query = gql`
    mutation($name: String!) {
      createUnit(data: { name: $name }) {
        _id
      }
    }
  `;

  const {
    createUnit: { _id },
  } = await runQuery({
    query,
    variables,
  });

  return _id;
};
