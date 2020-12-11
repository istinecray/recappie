import { gql } from "graphql-request";
import runQuery from "utilities/runQuery";

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
  } = await runQuery(query);

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
      response.statusCode = 201;
      response.send({
        message: "recipes: post request received",
      });
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
