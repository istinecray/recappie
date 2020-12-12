import getJson from "utilities/getJson";

const runQuery = async (request) => {
  const body = JSON.stringify(request);

  const headers = {
    authorization: `Bearer ${process.env.FAUNADB_TOKEN}`,
    "Content-Type": "application/json",
  };

  const { data, errors } = await fetch(process.env.GRAPHQL_URL, {
    body,
    headers,
    method: "POST",
  }).then(getJson);

  errors && console.log(errors);
  return data;
};

export default runQuery;
