import bcrypt from "bcryptjs";
import runQuery from "utilities/runQuery";
import { gql } from "graphql-request";

export const getUser = async (request) => {
  try {
    const query = gql`
      query($email: String!) {
        getUserByEmail(email: $email) {
          _id
        }
      }
    `;

    const variables = JSON.parse(request);

    const { getUserByEmail: data } = await runQuery({
      query,
      variables,
    });

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

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
      let user = await getUser(request.body);

      if (user) {
        response.statusCode = 403;
        response.send({
          message: "user exists",
        });
      } else {
        user = await createUser(request.body);
        response.statusCode = 200;
        response.send(user);
      }

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
