export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  try {
    const hello = "hello";

    response.statusCode = 200;
    response.send({
      hello,
    });
  } catch (error) {
    response.statusCode = 500;
    response.send({
      error,
    });
  }
};
