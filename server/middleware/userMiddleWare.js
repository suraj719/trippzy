import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided.", success: false });
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.body.userID = decoded.userID;
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Access denied. Invalid token.", success: false });
  }
};
