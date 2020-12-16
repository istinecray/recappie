import bcrypt from "bcrypt";
import runQuery from "utilities/runQuery";
import { gql } from "graphql-request";

export const login = async (request) => {
  try {
    const query = gql`
      query($email: String!) {
        getUserByEmail(email: $email) {
          hash
        }
      }
    `;

    const variables = JSON.parse(request);

    const {
      getUserByEmail: { hash },
    } = await runQuery({
      query,
      variables,
    });

    const { password } = variables;
    const success = await bcrypt.compare(password, hash);
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "GET":
      response.statusCode = 200;
      response.send({
        message: "auth: get request received",
      });
      break;
    case "POST":
      const user = await login(request.body);
      response.statusCode = 201;
      response.send(user);
      break;
    case "PUT":
      response.statusCode = 200;
      response.send({
        message: "auth: put request received",
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
};
