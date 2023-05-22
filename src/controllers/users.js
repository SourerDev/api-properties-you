const notifier = require("node-notifier");
const path = require("path");
const {
  User,
  Property,
  Favorite,
  Membership,
  MembershipType,
} = require("../db.js");
const {
  transport,
  registerMessage,
} = require("../utils/nodemailer/nodemailer.js");

//here
const { hashPassword, verifyPassword, generateToken } = require("../utils");


//POST
const signUp = async (req, res) => {
  const { fName, lName, password, email, cellphone, userName } = req.body;
  if (!fName || !lName || !cellphone || !password || !email)
    return res.status(400).send("Some data are missing");

  try {
    const findUser = await User.findOne({
      where: { email: email },
    });

    if (findUser) return res.status(409).send("User already exist");
    const hashPass = await hashPassword(password);
    const _user = await User.create({
      lName,
      fName,
      userName,
      email,
      cellphone,
      password: hashPass,
    });
    
    const user = {};
    for (const key in _user.dataValues) {
      if (key !== "password") user[key] = _user[key];
    }

    const token = generateToken({
      id: user.idUser,
      email: user.email,
      user: user.userName,
      type: user.userType,
    });

    return res.send({ 
      info: {
        message: "Usuario created successfully",
      },
      user,
      token,
    });

    /*     //notify property created succes
    notifier.notify(
      {
        sound: true,
        wait: true,
        title: `Bienvenid@ ${myuser.userName}! `,
        message: "Gracias por registrarte en Properties&&you",
        icon: path.join(
          "https://res.cloudinary.com/dg05pzjsq/image/upload/v1669030750/propertiesandyouicon_c9h24a.png"
        ),
      },
      function (err, response) {
        // console.log(err, response);
      }
    );
    //NODEMAILER, SEND EMAIL TO USER
    const info = await transport.sendMail(registerMessage(userName, email)); */

  } catch (err) {
    return res.status(500).send({ Error: err.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ Error: "Email and password are required" });

  try {
    const _user = await User.findOne({
      where: { email: email },
    });

    if (!_user) return res.status(404).json({ Error: "Email not found" });

    const passwordMatch = await verifyPassword(_user.password, password);
    if (!passwordMatch)
      return res.status(401).json({ Error: "Incorrect email or password." });

    if (_user.state === "blocked")
      return res.status(401).json({ Error: "This user is blocked" });

    const token = generateToken({
      id: _user.idUser,
      email: _user.email,
      user: _user.userName,
      type: _user.userType,
    });

    const user = {};
    for (const key in _user.dataValues) {
      if (key !== "password") user[key] = _user[key];
    }
    
    res.json({ user, token: token });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

//GET
const getUserById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await User.findOne({
      where: { idUser: idUser },
      include: { model: Favorite },
    });

    if (!user)
      return res.status(404).json({
        error: {
          message: "user not found",
        },
      });

    res.status(200).json({ info: { status: 200, message: "Success" }, user });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      include: { model: Membership },
    });

    if (!users.length)
      return res.send({
        error: { message: "No hay usuarios en la base de datos" },
      });

    res.status(200).json({ info: { mesagge: "Success" }, users });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

//PUT
const setState = async (req, res) => {
  const { idUser } = req.params;
  const { state } = req.query;

  if (!state)
    return res.status(400).json({ Error: "query ?state='' is required" });
  try {
    let user = await User.findByPk(idUser);
    if (!user?.idUser) return res.status(404).json({ Error: "User not found" });

    await User.update(
      { state },
      {
        where: {
          idUser: idUser,
        },
      }
    );
    res.send({ Message: `Correct updated` });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    let user = await User.findByPk(idUser);
    if (!user?.idUser) return res.status(404).json({ Error: "User not found" });

    await User.update(req.body, {
      where: {
        idUser: idUser,
      },
    });

    res.status(200).send({ Message: "User Updated" });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
};

const setPremium = async (req, res) => {
  const { idUser } = req.params;
  try {
    await User.update(
      { userType: "Premium" },
      {
        where: {
          idUser: idUser,
        },
      }
    );
    const user = await User.findByPk(idUser);

    res.status(200).send({ Message: user });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
};

//DELETE
const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  if (!idUser) return res.status(404).send("idUser is required");

  try {
    await User.destroy({ where: { idUser: idUser } });

    res.json({ Message: "User delete correctly" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

module.exports = {
  deleteUser,
  getUserById,
  getUsers,
  setPremium,
  setState,
  signUp,
  signIn,
  updateUser,
};
