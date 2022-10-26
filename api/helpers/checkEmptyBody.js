const checkEmptyBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return res.json({ message: "The request body is empty?!" });
  next();
};

export default checkEmptyBody;
