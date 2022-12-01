const sequelize = require("../../../database/db.config");
const PlantVariety = require("../../../database/model/PlantVariety");
import { object, string, number, date, InferType, boolean } from "yup";

export default async function handler(req, res) {
  //   await PlantVariety.sync();

  const plantVarietySchema = object({
    name: string().required(),
  });

  if (req.method === "GET") {
    // const { id } = req.query;
    const plantVariety = await PlantVariety.findAll();
    res.status(200).json({
      message: "Data Plant Main",
      data: plantVariety.length === 0 ? "data tidak ditemukan" : plantVariety,
    });
  }

  if (req.method === "POST") {
    const { name } = req.body;
    try {
      const plantVariety = await plantVarietySchema.validate(req.body, {
        strict: true,
      });
      const savedPlant = await PlantVariety.create(plantVariety);
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
    const { id, name } = req.body;
    try {
      const plantCheck = await plantVarietySchema.validate(req.body, {
        strict: true,
      });
      const plant = await PlantVariety.update(plantCheck, {
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
      await PlantVariety.destroy({ where: { id: id } });
      res.status(200).json({ message: "Data Berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ message: "Data Gagal dihapus" });
    }
  }
}
