import Router from "next/router";

const useRedirect = (Location, context) => {
  const { req, res } = context || {};

  if (req) {
    res.writeHead(302, {
      Location,
    });

    res.end();
  } else Router.push(Location);
};

export default useRedirect;
