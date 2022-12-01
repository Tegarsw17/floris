const sequelize = require("../../../database/db.config");
const PlantPosition = require("../../../database/model/PlantPosition");
import { object, string, number, date, InferType, boolean } from "yup";

export default async function handler(req, res) {
  //   await PlantPosition.sync();

  const plantPositionSchema = object({
    // id: number().required(),
    plant_id: number().required(),
    latitude: number().required(),
    longitude: number().required(),
  });

  if (req.method === "GET") {
    // const { id } = req.query;
    const plant = await PlantPosition.findAll();
    res.status(200).json({
      message: "Data Plant Main",
      data: plant.length === 0 ? "data tidak ditemukan" : plant,
    });
  }

  if (req.method === "POST") {
    const { plant_id, latitude, longitude } = req.body;
    try {
      const plant = await plantPositionSchema.validate(req.body, {
        strict: true,
      });
      const savedPlant = await PlantPosition.create(plant);
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
    const { id, plant_id, latitude, longitude } = req.body;
    try {
      const plantCheck = await plantPositionSchema.validate(req.body, {
        strict: true,
      });
      const plant = await PlantPosition.update(plantCheck, {
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
      await PlantPosition.destroy({ where: { id: id } });
      res.status(200).json({ message: "Data Berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ message: "Data Gagal dihapus" });
    }
  }
}
