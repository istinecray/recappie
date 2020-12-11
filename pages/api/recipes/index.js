import { gql } from "graphql-request";
import runQuery from "utilities/runQuery";

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "GET":
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

      const recipes = await runQuery(query);
      response.statusCode = 200;
      response.send(recipes);
      break;
    case "POST":
      response.statusCode = 201;
      response.send({
        message: "post request received",
      });
      break;
    case "PUT":
      response.statusCode = 200;
      response.send({
        message: "put request received",
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
};
