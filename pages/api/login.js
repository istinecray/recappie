import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import runQuery from "utilities/runQuery";
import { createRefreshToken } from "pages/api/refreshTokens";
import { gql } from "graphql-request";
import { v4 } from "uuid";

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
    let success = await bcrypt.compare(password, hash);

    if (success) {
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      const refreshToken = v4();

      Cookies.set("refreshToken", refreshToken, {
        domain: process.env.DOMAIN,
        expires: process.env.REFRESH_TOKEN_EXPIRY,
        httpOnly: true,
        path: "/",
        sameSite: true,
        secure: process.env.NEXT_PUBLIC_BASE_URL.includes("https"),
      });

      const { _id: userId } = user;

      success = await createRefreshToken({
        refreshToken,
        userId,
      });

      if (success)
        return {
          token,
        };
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "POST":
      const token = await login(request.body);
      response.statusCode = 201;
      response.send(token);
      break;
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
};
