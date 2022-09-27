'use strict';

const { User } = require('../models');

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
     return await queryInterface.bulkInsert('User', [
      {
       firstName: "Rick",
       lastName: "Novak",
       username: "demoRN",
       hashedPassword: bcrypt.hashSync('password1'),
       email: "user1@user.io"
     },
     {
      firstName: "Susan",
      lastName: "Connor",
      username: "demoSC",
      hashedPassword: bcrypt.hashSync('password2'),
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
     await queryInterface.bulkDelete('User', null, {});
  }
};