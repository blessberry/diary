export default (res, status, type, message) => {
  res.status(status).json({
    status: "error",
    [type]: message
  });
};
