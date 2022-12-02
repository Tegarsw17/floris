import sequelize from "../../../database/db.config";
import { object, string, number, date, InferType, boolean } from "yup";

const User = require("../../../database/model/User");
// const UserDuty = require("../../../database/model/UserDuty");
// const UserRole = require("../../../database/model/UserRole");
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  const userSchema = object({
    name: string().required(),
    usesrname: string().required(),
    email: string().required(),
    password: string().required(),
    address: string().required(),
    role_id: number().required(),
    phone_number: number().required(),
    is_active: boolean(),
  });

  //   sequelize.sync();
  if (req.method === "GET") {
    try {
      const users = await User.findAll();
      res.status(200).json({
        data: users.length === 0 ? "Data tidak ditemukan" : users,
        message: "Hello from User!",
      });
    } catch (error) {
      res.status(400).json({ message: "Data tidak ditemukan", error: error });
    }
  }

  if (req.method === "POST") {
    const { name, username, email, password, address, role_id, phone_number } =
      req.body;
    try {
      const encryptPass = await bcrypt.hash(password, 10);
      const users = await User.create({
        name,
        username,
        email,
        password: encryptPass,
        address,
        role_id,
        phone_number,
        is_active: false,
      });
      res
        .status(200)
        .json({ data: users, message: "User berhasil ditambahkan" });
    } catch (error) {
      res.status(400).json({ message: "Data yang dimasukkan tidak valid" });
    }
  }
  //   res.status(200).json({ message: "Hello from User!" });
}
