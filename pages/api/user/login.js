import jwt from "jsonwebtoken";

const User = require("../../../database/model/User");
const bcrypt = require("bcrypt");
const key = process.env.NEXT_PUBLIC_JWT_PASSWORD;

export default async function handler(req, res) {
  if (req.method != "POST") {
    res.status(405).json({ status: "error", error: "Method Not Allowed" });
  }

  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      //   check field filled
      if (!username || !password) {
        return res.status(400).json({
          status: "error",
          error: "Request missing username or password",
        });
      }
      const user = await User.findAll({
        where: { username: username },
      });
      //   check user exsit
      if (user.length == 0) {
        res.status(400).json({ status: "error", error: "User Not Found" });
      }
      //   vallidate
      if (user.length > 0) {
        const userId = user[0].id,
          userPassword = user[0].password,
          userUsername = user[0].username,
          userEmail = user[0].email,
          userIsActive = user[0].is_active,
          userRole = user[0].role_id;
        //   check active
        if (userIsActive == false) {
          res.status(400).json({
            status: "error",
            error: "You must be activated this account",
          });
        } else {
          const compare = await bcrypt.compare(password, userPassword);
          if (compare == true) {
            const payload = {
              username: userUsername,
              email: userEmail,
              role: userRole,
            };
            // sign jwt content/payload
            const token = jwt.sign(payload, key, { expiresIn: 86400 });
            res.status(200).json({ success: true, message: token });
          } else {
            res
              .status(400)
              .json({ success: false, message: "wrong username or password" });
          }
        }
      }
    } catch (error) {
      res
        .status(400)
        .json({ error: error, message: "OMG something just hapen😢" });
    }
  }
}
