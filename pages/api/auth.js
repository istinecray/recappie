import Cookies from "js-cookie";
import asyncFind from "utilities/asyncFind";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import runQuery from "utilities/runQuery";
import { gql } from "graphql-request";
import { uuid } from "uuidv4";

export const createRefreshToken = async ({ refreshToken, userId }) => {
  try {
    const query = gql`
      mutation(
        $expiry: String!
        $hash: String!
        $user: RefreshTokenUserRelation
      ) {
        createRefreshToken(
          data: { expiry: $expiry, hash: $hash, user: $user }
        ) {
          _id
        }
      }
    `;

    const salt = parseInt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(refreshToken, salt);
    const expiry = Date.now().toString();

    const user = {
      connect: userId,
    };

    const variables = {
      expiry,
      hash,
      user,
    };

    const {
      createRefreshToken: { data },
    } = await runQuery({
      query,
      variables,
    });

    return data;
  } catch (e) {
    console.log(e);
  }

  return null;
};

const getRefreshTokens = async (variables) => {
  const query = gql`
    mutation($email: String!) {
      getUserByEmail(email: $email) {
        refreshTokens {
          data {
            expiry
            hash
          }
        }
      }
    }
  `;

  const {
    getUserByEmail: { data },
  } = await runQuery({
    query,
    variables,
  });

  return data;
};

export const validateRefreshToken = async (variables) => {
  const currentHash = Cookies.get("refreshToken");
  if (!currentHash) return false;

  const refreshTokens = await getRefreshTokens(variables);
  const hasRefreshTokens = refreshTokens.length;
  if (!hasRefreshTokens) return false;

  const getCurrentRefreshToken = async ({ hash }) =>
    await bcrypt.compare(currentHash, hash);

  const refreshToken = await asyncFind(refreshTokens, getCurrentRefreshToken);

  const { expiry } = refreshToken;
  const isValid = expiry > Date.now();

  return isValid;
};

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

      const refreshToken = uuid();

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

  return {};
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
