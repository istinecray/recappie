import Cookies from "js-cookie";
import asyncFind from "utilities/asyncFind";
import bcrypt from "bcryptjs";
import runQuery from "utilities/runQuery";
import { gql } from "graphql-request";
import { v4 } from "uuid";

export const createRefreshToken = async ({ refreshToken = v4(), userId }) => {
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
      createRefreshToken: { _id },
    } = await runQuery({
      query,
      variables,
    });

    return _id;
  } catch (e) {
    console.error(e);
  }

  return null;
};

const getRefreshTokens = async (variables) => {
  const query = gql`
    mutation($email: String!) {
      getUserByEmail(email: $email) {
        refreshTokens {
          data {
            _id
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

const getId = ({ _id: id }) => ({
  id,
});

const deleteRefreshToken = async (variables) => {
  const query = gql`
    mutation($id: String!) {
      deleteRefreshToken(id: $id) {
        _id
      }
    }
  `;

  const {
    deleteRefreshToken: { data },
  } = await runQuery({
    query,
    variables,
  });

  return data;
};

const deleteRefreshTokens = async (refreshTokens) =>
  await Promise.all(refreshTokens.map(deleteRefreshToken));

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
  const isValid = parseInt(expiry) > Date.now();

  if (!isValid) {
    const refreshTokenIds = refreshTokens.map(getId);
    await deleteRefreshTokens(refreshTokenIds);
  }

  return isValid;
};

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  switch (request.method) {
    case "GET":
      response.statusCode = 200;
      response.send({
        message: "refreshTokens: get request received",
      });
      break;
    case "POST":
      response.statusCode = 201;
      response.send({
        message: "refreshTokens: post request received",
      });
      break;
    case "PUT":
      response.statusCode = 200;
      response.send({
        message: "refreshTokens: put request received",
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
};
