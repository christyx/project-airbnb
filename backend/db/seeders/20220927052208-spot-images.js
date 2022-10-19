'use strict';

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
     return await queryInterface.bulkInsert('SpotImages', [
       {
         spotId: 1,
         url: "https://a0.muscache.com/im/pictures/16e8884c-7ff7-4868-a627-aafe0bfbb963.jpg",
         preview: true
       },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/7754bf35-8060-4476-9751-6886040af3b6.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/386ad083-613d-4f42-b649-102ac25a0f9e.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47818404/original/2779d02b-5f3b-49e7-ab47-6f5a4b4d6192.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/9ec49502-f580-49a0-be66-d8d82b352a7a.jpg",
        preview: true
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
     await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
