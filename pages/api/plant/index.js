import formidable from "formidable";
import fs from "fs";
import { object, string, number, date, InferType, boolean } from "yup";
const sequelize = require("../../../database/db.config");
const Plant = require("../../../database/model/Plant");
const PlantVariety = require("../../../database/model/PlantVariety");
const sharp = require("sharp");

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file, name) => {
  const data = fs.readFileSync(file.filepath);
  // const name = await generateName(file.originalFilename);
  // await fs.writeFileSync(`./public/${name}`, data);
  // await fs.unlinkSync(file.filepath);
  await sharp(data)
    .webp({ quality: 20 })
    .toFile("./public/" + name);
  return;
};

const generateName = async (lastName, variety) => {
  const variant = variety[0].dataValues.name;
  if (lastName.length > 0) {
    const data = lastName.at(-1).dataValues.name;
    if (data == null) {
      return {
        name: variant + " 01",
        slug: variant + "-01",
      };
    }
    const dataSplit = data.split(" ");
    var lastNum = parseInt(dataSplit[1]) + 1;
    lastNum < 10 ? (lastNum = "0" + lastNum) : lastNum;
    return {
      name: variant + " " + lastNum,
      slug: variant + "-" + lastNum,
    };
  } else if (lastName.length == 0) {
    return {
      name: variant + " 01",
      slug: variant + "-01",
    };
  }
};

const generateNameImage = async (name, variety) => {
  var currentdate = new Date();
  var datetime =
    "" +
    currentdate.getFullYear() +
    (currentdate.getMonth() + 1) +
    currentdate.getDate() +
    currentdate.getHours() +
    currentdate.getMinutes() +
    currentdate.getSeconds();
  const extension = await name.originalFilename.split(".");
  var result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${variety}-${result}-${datetime}.webp`;
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    // await Plant.sync({ alter: true });
    const plant = await Plant.findAll();
    res.status(200).json({ message: "Data Plant", data: plant });
  }

  if (req.method === "POST") {
    try {
      console.log("masalah 1");
      const form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        const varietyId = fields.variety;
        const imgName = await generateNameImage(files.file, varietyId);
        await saveFile(files.file, imgName);

        const variety = await PlantVariety.findAll({
          where: {
            id: varietyId,
          },
        });
        const plant = await Plant.findAll({
          where: {
            variety_id: varietyId,
          },
        });

        var values = await generateName(plant, variety);
        const plantAdd = await Plant.create({
          name: values.name,
          image: imgName,
          variety_id: varietyId,
          slug: values.slug,
          is_alive: true,
        });
        console.log("masalah 2");
      });
      res.status(200).json({ message: "Data berhasil Ditambahkan" });
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
