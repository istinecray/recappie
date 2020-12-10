import client from "./client";

const makeRequest = async (query) => await client.request(query);

export default makeRequest;
