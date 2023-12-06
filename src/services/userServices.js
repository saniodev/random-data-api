require("dotenv").config();

const axios = require("axios");
const moment = require("moment");
const currentDate = moment().format("YYYY-MM-DD");
const uuid = require('uuid');
const { readCsvFile, createdCsvFile } = require('../helpers/generatedCsv');
const { generateNumericId } = require('../helpers/generatedNumber');
const fs = require('fs');
const csv = require('csv-parser');
const CSV_FILE_PATH = './src/csv/users.csv';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const { Users } = require("../database/models");

const urlBase = process.env.BASE_URL;

const getCreatedUserCsv = async (req, res) => {
  try {
    const apiUrl = `${urlBase}/users`;

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: response.message });
    }

    const userData = response.data;

    const existingUser = await Users.findOne({
      where: { user_Id: userData.id },
    });

    if (existingUser) {
      return res
        .status(200)
        .json({
          user: existingUser,
          message: "Users already exists in the database",
        });
    }

    const objectUsers = {
      user_Id: userData.id,
      uid: userData.uid,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar,
      gender: userData.gender,
      phone_number: userData.phone_number,
      social_insurance_number: userData.social_insurance_number,
      date_of_birth: userData.date_of_birth,
      employment_title: userData.employment.title,
      employment_key_skill: userData.employment.key_skill,
      city: userData.address.city,
      street_name: userData.address.street_name,
      street_address: userData.address.street_address,
      zip_code: userData.address.zip_code,
      state: userData.address.state,
      country: userData.address.country,
      coordinates_lat: userData.address.coordinates.lat,
      coordinates_lng: userData.address.coordinates.lng,
      cc_number: userData.credit_card.cc_number,
      subscription_plan: userData.subscription.plan,
      subscription_status: userData.subscription.status,
      subscription_payment_method: userData.subscription.payment_method,
      subscription_term: userData.subscription.term,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const createdUser = await Users.create(objectUsers);

    await createdCsvFile(objectUsers);

    return res
      .status(200)
      .json({
        User: createdUser,
        message: "Created User successfully in DB AND CSV OF API",
      });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res, _next) => {
  try {
    const {
      password,
      first_name,
      last_name,
      username,
      email,
      avatar,
      gender,
      phone_number,
      social_insurance_number,
      date_of_birth,
      title,
      key_skill,
      city,
      street_name,
      street_address,
      zip_code,
      state,
      country,
      lat,
      lng,
      cc_number,
      plan,
      stat,
      payment_method,
      term,
    } = req.body;

    const objectUser = {
      user_Id: generateNumericId(5),
      uid: uuid.v4(), 
      password: password,
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      avatar: avatar,
      gender: gender,
      phone_number: phone_number,
      social_insurance_number: social_insurance_number,
      date_of_birth: date_of_birth,
      employment_title: title,
      employment_key_skill: key_skill,
      city: city,
      street_name: street_name,
      street_address: street_address,
      zip_code: zip_code,
      state: state,
      country: country,
      coordinates_lat: lat,
      coordinates_lng: lng,
      cc_number: cc_number,
      subscription_plan: plan,
      subscription_status: stat,
      subscription_payment_method: payment_method,
      subscription_term: term,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const createdUser = await Users.create(objectUser);
    
    await createdCsvFile(objectUser);

    return res
      .status(200)
      .json({ user: createdUser, message: "Created User success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res, _next) => {
  try {
    const users = await Users.findAll();

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const users = await readCsvFile();

    const userFilter = users.map((us, index) => ({ user: us, index }));

    const positionFile = userFilter.find((a) => a.user.user_Id === id)?.index;

    const existingUser = await Users.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      password,
      first_name,
      last_name,
      username,
      email,
      avatar,
      gender,
      phone_number,
      social_insurance_number,
      date_of_birth,
      title,
      key_skill,
      city,
      street_name,
      street_address,
      zip_code,
      state,
      country,
      lat,
      lng,
      cc_number,
      plan,
      stat,
      payment_method,
      term,
    } = req.body;

    const objectUser = {
      password,
      first_name,
      last_name,
      username,
      email,
      avatar,
      gender,
      phone_number,
      social_insurance_number,
      date_of_birth,
      title,
      key_skill,
      city,
      street_name,
      street_address,
      zip_code,
      state,
      country,
      lat,
      lng,
      cc_number,
      plan,
      stat,
      payment_method,
      term,
      updatedAt: currentDate,
    };

    await existingUser.update(objectUser);

    if (positionFile !== undefined) {
      users[positionFile] = existingUser.dataValues;
      const csvWriter = createCsvWriter({
        path: CSV_FILE_PATH,
        header: Object.keys(users[0]).map((key) => ({ id: key, title: key })),
      });
      csvWriter.writeRecords(users);
    }

    return res.status(200).json({ message: `The User ${existingUser.username} was successfully updated` });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await Users.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedUserName = existingUser.username;

    const users = [];
    if (fs.existsSync(CSV_FILE_PATH)) {
      fs.createReadStream(CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (row) => users.push(row))
        .on('end', async () => {
          const updatedUsers = users.filter((user) => user.user_Id !== String(existingUser.user_Id));
          const csvWriter = createCsvWriter({
            path: CSV_FILE_PATH,
            header: updatedUsers.length > 0 ? Object.keys(updatedUsers[0]).map((key) => ({ id: key, title: key })) : [],
          });

          await new Promise((resolve, reject) => {
            csvWriter.writeRecords(updatedUsers)
              .then(() => resolve())
              .catch((error) => reject(error));
          });
          
          await existingUser.destroy();

          return res.status(200).json({
            message: `User with Name ${deletedUserName} was successfully deleted`,
          });
        });
    } else {
      await existingUser.destroy();

      return res.status(200).json({
        message: `User with Name ${deletedUserName} was successfully deleted (CSV file not found)`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserByName = async (req, res, _next) => {
  try {
    const { nome } = req.params;
    const users = await Users.findAll({ where: { username: nome } });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found with the specified name' });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCreatedUserCsv,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByName
};
