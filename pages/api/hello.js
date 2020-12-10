import faunadb from "faunadb";
const { query } = faunadb;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

export default async (_, response) => {
  response.setHeader("Content-Type", "application/json");

  try {
    const recipes = await client.query(
      query.Map(
        query.Paginate(query.Documents(query.Collection("recipes"))),
        query.Lambda((recipe) => query.Get(recipe))
      )
    );

    response.statusCode = 200;
    response.send({
      recipes,
    });
  } catch (error) {
    response.statusCode = 500;
    response.send({
      error,
    });
  }
};
