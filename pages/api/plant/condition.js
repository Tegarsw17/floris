const sequelize = require("../../../database/db.config");
const PlantCondition = require("../../../database/model/PlantCondition");
import { object, string, number, date, InferType, boolean } from "yup";

export default async function handler(req, res) {
  //   await PlantCondition.sync();

  const plantConditionSchema = object({
    name: string().required(),
    color: string().required(),
  });

  if (req.method === "GET") {
    // const { id } = req.query;
    const plantCondition = await PlantCondition.findAll();
    res.status(200).json({
      message: "Data Plant Main",
      data:
        plantCondition.length === 0 ? "data tidak ditemukan" : plantCondition,
    });
  }

  if (req.method === "POST") {
    const { name, color } = req.body;
    try {
      const plantCondition = await plantConditionSchema.validate(req.body, {
        strict: true,
      });
      const savedPlant = await PlantCondition.create(plantCondition);
      res
        .status(200)
        .json({ input: savedPlant, message: "data berhasil dimasukkan" });
    } catch (error) {
      res.status(400).json({
        error: "data yang dimasukkan salah",
      });
    }
  }

  if (req.method === "PUT") {
    const { id, name, color } = req.body;
    try {
      const plantCheck = await plantConditionSchema.validate(req.body, {
        strict: true,
      });
      const plant = await PlantCondition.update(plantCheck, {
        where: { id: id },
      });
      res
        .status(200)
        .json({ data: plantCheck, message: "Data berhasil diubah" });
    } catch (error) {
      res.status(400).json({ message: "data yang dimasukkan tidak valid" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await PlantCondition.destroy({ where: { id: id } });
      res.status(200).json({ message: "Data Berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ message: "Data Gagal dihapus" });
    }
  }
}
