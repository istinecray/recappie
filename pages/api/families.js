import { gql } from "graphql-request";
import runQuery from "utilities/runQuery";

export const getFamilies = async () => {
  const query = gql`
    {
      allFamilies {
        data {
          _id
          name
          recipes {
            data {
              name
            }
          }
        }
      }
    }
  `;

  const {
    allFamilies: { data },
  } = await runQuery({
    query,
  });

  return data;
};

export const createFamily = async (request) => {
  const variables = JSON.parse(request);

  const query = gql`
    mutation($name: String!) {
      createFamily(data: { name: $name }) {
        name
      }
    }
  `;

  const { createFamily: data } = await runQuery({
    query,
    variables,
  });

  return data;
};

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "POST":
      const family = await createFamily(request.body);
      response.statusCode = 201;
      response.send(family);
      break;
    case "PUT":
      response.statusCode = 200;
      response.send({
        message: "families: put request received",
      });
      break;
    default:
      const families = await getFamilies();
      response.statusCode = 200;
      response.send(families);
      break;
  }
};
