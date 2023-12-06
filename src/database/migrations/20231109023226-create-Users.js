'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      password: {
        type: Sequelize.STRING,
      },

      first_name: {
        type: Sequelize.STRING,
      },

      last_name: {
        type: Sequelize.STRING,
      },

      username: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },

      avatar: {
        type: Sequelize.STRING,
      },

      gender: {
        type: Sequelize.STRING,
      },

      phone_number: {
        type: Sequelize.STRING,
      },

      social_insurance_number: {
        type: Sequelize.STRING,
      },

      date_of_birth: {
        type: Sequelize.DATEONLY,
      },

      employment_title: {
        type: Sequelize.STRING,
      },

      employment_key_skill: {
        type: Sequelize.STRING,
      },

      city: {
        type: Sequelize.STRING,
      },

      street_name: {
        type: Sequelize.STRING,
      },

      street_address: {
        type: Sequelize.STRING,
      },

      zip_code: {
        type: Sequelize.STRING,
      },

      state: {
        type: Sequelize.STRING,
      },

      country: {
        type: Sequelize.STRING,
      },

      coordinates_lat: {
        type: Sequelize.FLOAT,
      },

      coordinates_lng: {
        type: Sequelize.FLOAT,
      },

      cc_number: {
        type: Sequelize.STRING,
      },

      subscription_plan: {
        type: Sequelize.STRING,
      },

      subscription_status: {
        type: Sequelize.STRING,
      },

      subscription_payment_method: {
        type: Sequelize.STRING,
      },

      subscription_term: {
        type: Sequelize.STRING,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
