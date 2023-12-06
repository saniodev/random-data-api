"use strict";

/**  
* @param {import('sequelize').Sequelize } sequelize
* @param {import('sequelize').DataTypes } DataTypes 

*/

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      user_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
      },

      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      password: {
        type: DataTypes.STRING,
      },

      first_name: {
        type: DataTypes.STRING,
      },

      last_name: {
        type: DataTypes.STRING,
      },

      username: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
      },

      avatar: {
        type: DataTypes.STRING,
      },

      gender: {
        type: DataTypes.STRING,
      },

      phone_number: {
        type: DataTypes.STRING,
      },

      social_insurance_number: {
        type: DataTypes.STRING,
      },

      date_of_birth: {
        type: DataTypes.DATEONLY,
      },

      employment_title: {
        type: DataTypes.STRING,
      },

      employment_key_skill: {
        type: DataTypes.STRING,
      },

      city: {
        type: DataTypes.STRING,
      },

      street_name: {
        type: DataTypes.STRING,
      },

      street_address: {
        type: DataTypes.STRING,
      },

      zip_code: {
        type: DataTypes.STRING,
      },

      state: {
        type: DataTypes.STRING,
      },

      country: {
        type: DataTypes.STRING,
      },

      coordinates_lat: {
        type: DataTypes.FLOAT,
      },

      coordinates_lng: {
        type: DataTypes.FLOAT,
      },

      cc_number: {
        type: DataTypes.STRING,
      },

      subscription_plan: {
        type: DataTypes.STRING,
      },

      subscription_status: {
        type: DataTypes.STRING,
      },

      subscription_payment_method: {
        type: DataTypes.STRING,
      },

      subscription_term: {
        type: DataTypes.STRING,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: "Users",
      timestamps: false,
    }
  );

  return User;
};
