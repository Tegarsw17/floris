const sequelize = require("../../../database/db.config");
const Plant = require("../../../database/model/Plant");
import { object, string, number, date, InferType, boolean } from "yup";

export default async function handler(req, res) {
  const plantSchema = object({
    name: string().required(),
    variety_id: number().required(),
    first_planting: string().required(),
    isAlive: boolean(),
  });
  if (req.method === "GET") {
    const plant = await Plant.findAll();
    res.status(200).json({ message: "Data Plant", data: plant });
  }

  if (req.method === "POST") {
    const { name, variety_id, first_planting, is_alive, image } = req.body;
    // image must fill is not default #TASK
    try {
      const plantValidate = await plantSchema.validate(req.body, {
        strict: true,
      });
      const plant = await Plant.create(plantValidate);
      res
        .status(200)
        .json({ data: plant, message: "data berhasil dimasukkan" });
    } catch (error) {
      res.status(400).json({
        data: error,
        message: "data yang dimasukkan tidak valid",
      });
    }
  }

  if (req.method === "PUT") {
    const { id, name, variety_id, first_planting, isAlive, image } = req.body;
    try {
      const plantCheck = await plantSchema.validate(req.body, {
        strict: true,
      });
      const plant = await Plant.update(plantCheck, { where: { id: id } });
      const resultDB = await Plant.findAll({ where: { id: id } });
      res.status(200).json({ data: resultDB, message: "Data berhasil diubah" });
    } catch (error) {
      res.status(400).json({ message: "Data yang dimasukkan tidak valid" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const resultDB = await Plant.findAll({ where: { id: id } });
      await Plant.destroy({ where: { id: id } });
      res.status(200).json({ message: "id:" + id + " berhasil di hapus" });
    } catch (error) {
      res.status(400).json({ message: "Data Gagal dihapus", error: error });
    }
  }
}
