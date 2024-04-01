
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: 120, // 
  });
}

function verifyToken(req, res, next) {
  const tokenComBearer = req.headers["authorization"];
  let token = tokenComBearer.split(" ")[1]
  
  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: "Token não fornecido." });


  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Falha ao autenticar o token." });

    req.userId = decoded.id;
    next();
  });
}

module.exports = { generateToken, verifyToken };
