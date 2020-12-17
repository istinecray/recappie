const withAuth = (next) => (context) => {
  return next(context);
};

export default withAuth;
