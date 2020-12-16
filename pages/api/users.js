import bcrypt from "bcrypt";
import runQuery from "utilities/runQuery";
import { gql } from "graphql-request";

export const createUser = async (request) => {
  try {
    const query = gql`
      mutation($email: String!, $hash: String!) {
        createUser(data: { email: $email, hash: $hash }) {
          email
        }
      }
    `;

    let { password, ...variables } = JSON.parse(request);
    const salt = parseInt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    variables = {
      ...variables,
      hash,
    };

    const { createUser: data } = await runQuery({
      query,
      variables,
    });

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "GET":
      response.statusCode = 200;
      response.send({
        message: "users: get request received",
      });
      break;
    case "POST":
      const user = await createUser(request.body);
      response.statusCode = 201;
      response.send(user);
      break;
    case "PUT":
      response.statusCode = 200;
      response.send({
        message: "users: put request received",
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
};
