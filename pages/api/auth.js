import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import runQuery from "utilities/runQuery";
import { gql } from "graphql-request";

export const login = async (request) => {
  try {
    const query = gql`
      query($email: String!) {
        getUserByEmail(email: $email) {
          _id
          email
          hash
        }
      }
    `;

    const variables = JSON.parse(request);

    const {
      getUserByEmail: { hash, ...user },
    } = await runQuery({
      query,
      variables,
    });

    const { password } = variables;
    const success = await bcrypt.compare(password, hash);

    if (success) {
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 3000,
      });

      return {
        token,
      };
    }

    return {};
  } catch (e) {
    console.log(e);
    return {};
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
      const token = await login(request.body);
      response.statusCode = 201;
      response.send(token);
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
