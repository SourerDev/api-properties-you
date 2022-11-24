const { Property, Feedback, User } = require("../db.js");
const notifier = require("node-notifier");
const path = require("path");
const {
  transport,
  messageForUsersCreateProperty,
} = require("../utils/nodemailer/nodemailer.js");

//create properties //POST AL FRONT
const createProperty = async (req, res) => {
  const {
    address,
    area,
    bathrooms,
    environments,
    antiquity,
    floors,
    rooms,
    garage,
    price,
    type,
    description,
  } = req.body;

  try {
    if (
      ![
        address,
        area,
        bathrooms,
        environments,
        antiquity,
        floors,
        rooms,
        garage,
        price,
        type,
        description,
      ].every(Boolean)
    ) {
      throw new Error("Faltan completar datos");
    }
    const properties = await Property.create(req.body);

    // const { id_User } = req.body;

    // const findUser = await User.findOne({
    //   where: {
    //     id_User: id_User,
    //   },
    // });

    // const email = findUser._previousDataValues.email;
    // const userName = findUser._previousDataValues.userName;

    // const stateMail = await transport.sendMail(
    //   messageForUsersCreateProperty(email, userName)
    // );

    // notify property created succes
    notifier.notify(
      {
        sound: true,
        wait: true,
        title: `Propiedad creada con exito! `,
        message: "Gracias por confiar en Properties&&you",
        icon: path.join(
          "https://res.cloudinary.com/dg05pzjsq/image/upload/v1669030750/propertiesandyouicon_c9h24a.png"
        ),
      },
      function (err, response) {
        console.log(err, response);
      }
    );

    res.status(201).json({
      Message: "Propiedad creada",
      payload: properties,
    });
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

//GET ALL PROPERTIES / GET AL FRONT
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: { model: User, attributes: { exclude: ["password"] } },
    });

    if (!properties.length) throw new Error("No hay propeidades");

    res.status(200).json({ Message: "Success", payload: properties });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

//function find by id
const findPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const searchByPK = await Property.findOne({
      where: { id: id },
      include: { model: Feedback },
    });

    if (!searchByPK) throw new Error("Id inexistente");

    res.status(200).json({ Message: "Succes", paylaod: searchByPK });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const getAllAddress = async (req, res) => {
  try {
    const addressUser = await Property.findAll({
      attributes: ["address"],
    });

    //Send all address to frontend array string
    let arrAddress = [];
    addressUser.forEach((el) => arrAddress.push(el.toJSON().address));
    res.status(200).json({ Message: arrAddress });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

//Borrado logico Property => PUT
const disableProperty = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  try {
    const searchPropertyById = await Property.findByPk(id);

    if (!searchPropertyById) return res.send("Propiedad no encontrada");

    const uploadProperty = await Property.update(
      { ...req.body, state: !state },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send({ Message: uploadProperty });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const uplaodProperty = async (req, res) => {
  const { id } = req.params;

  try {
    // let findProperty = await Property.findByPk(id);

    const newUploadProperty = await Property.update(req.body, {
      where: {
        id: id,
      },
    });

    const updatedProperty = req.body;

    if (newUploadProperty[0] === 0) throw new Error("Propiedad inexistente");

    res
      .status(200)
      .json({ Message: "Propiedad actualizada!", payload: updatedProperty });
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  findPropertyById,
  getAllAddress,
  disableProperty,
  uplaodProperty,
};
