const JWT = require("jsonwebtoken");
const User = require("../models/userModels");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("MIDDLEWARE ERROR: No token or bad header format.");
      return res
        .status(401)
        .send({ message: "Auth Failed: Token missing", success: false });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        // THIS WILL TELL US IF THE TOKEN ITSELF IS THE PROBLEM
        console.error("JWT VERIFY ERROR:", err.message);
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        // Token is valid, let's see what's inside
        console.log("Decoded token payload:", decode);

        // Now, let's check the database
        const user = await User.findById(decode.id);

        // THIS WILL TELL US IF THE USER EXISTS
        console.log("User found in DB:", user ? user._id.toString() : null);

        if (!user) {
          return res.status(200).send({
            message: "User Not Found",
            success: false,
          });
        } else {
          req.userId = decode.id;
          req.user = user;
          next();
        }
      }
    });
  } catch (error) {
    console.error("Auth Middleware CRASH:", error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
