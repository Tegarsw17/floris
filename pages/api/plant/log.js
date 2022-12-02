const sequelize = require("../../../database/db.config");
const PlantLog = require("../../../database/model/PlantLog");
import { object, string, number, date, InferType, boolean } from "yup";

export default async function handler(req, res) {
  //   await PlantLog.sync();

  const plantLogSchema = object({
    plant_id: number().required(),
    condition_id: number().required(),
    description: string().required(),
  });

  if (req.method === "GET") {
    // const { id } = req.query;
    const plantLog = await PlantLog.findAll();
    res.status(200).json({
      message: "Data Plant Main",
      data: plantLog.length === 0 ? "data tidak ditemukan" : plantLog,
    });
  }

  if (req.method === "POST") {
    const { plant_id, condition_id, description } = req.body;
    try {
      const plantLog = await plantLogSchema.validate(req.body, {
        strict: true,
      });
      const savedPlant = await PlantLog.create(plantLog);
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
    const { id, plant_id, condition_id, description } = req.body;
    try {
      const plantCheck = await plantLogSchema.validate(req.body, {
        strict: true,
      });
      const plant = await PlantLog.update(plantCheck, {
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
      await PlantLog.destroy({ where: { id: id } });
      res.status(200).json({ message: "Data Berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ message: "Data Gagal dihapus" });
    }
  }
}
