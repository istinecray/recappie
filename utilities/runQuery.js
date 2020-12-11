import getJson from "./getJson";

const runQuery = async (query) => {
  const body = JSON.stringify({
    query,
  });

  const headers = {
    authorization: `Bearer ${process.env.FAUNADB_TOKEN}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(process.env.GRAPHQL_URL, {
    body,
    headers,
    method: "POST",
  }).then(getJson);

  return response;
};

export default runQuery;