import { GraphQLClient } from "graphql-request";

export default new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_TOKEN}`,
  },
});
