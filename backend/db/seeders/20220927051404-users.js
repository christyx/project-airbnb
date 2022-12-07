'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Users';
     return await queryInterface.bulkInsert(options, [
      {
       firstName: "demo",
       lastName: "user",
       username: "Demo-lition",
       hashedPassword: "password",
       email: "demo@appacademy.io"
     },
     {
      firstName: "Susan",
      lastName: "Connor",
      username: "demoSC",
      hashedPassword: "abcdefg",
      email: "user2@user.io"
    },
    {
      firstName: "Roger",
      lastName: "Smith",
      username: "demoRS",
      hashedPassword: bcrypt.hashSync('password3'),
      email: "user3@user.io"
    },
    {
      firstName: "Lucy",
      lastName: "Forbis",
      username: "demoLF",
      hashedPassword: bcrypt.hashSync('password4'),
      email: "user4@user.io"
    },
    {
      firstName: "Jeff",
      lastName: "Johnson",
      username: "demoJJ",
      hashedPassword: bcrypt.hashSync('password5'),
      email: "user5@user.io"
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options);
  }
};
