import { gql } from "graphql-request";
import runQuery from "utilities/runQuery";

export const getFamilies = async () => {
  const query = gql`
    {
      allFamilies {
        data {
          _id
          name
        }
      }
    }
  `;

  const {
    allFamilies: { data },
  } = await runQuery(query);

  return data;
};

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "POST":
      response.statusCode = 201;
      response.send({
        message: "families: post request received",
      });
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
