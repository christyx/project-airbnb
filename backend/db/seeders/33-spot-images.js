'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
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
    options.tableName = 'SpotImages';
    return await queryInterface.bulkInsert(options, [
       {
         spotId: 1,
         url: "https://a0.muscache.com/im/pictures/16e8884c-7ff7-4868-a627-aafe0bfbb963.jpg",
         preview: true
       },
      {
        spotId: 9,
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
        url: "https://a0.muscache.com/im/pictures/d312644d-fb13-40c1-b671-4b1fa20e04a2.jpg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47051400/original/2b9c593f-2027-4f97-a1f7-6eabd4605b5c.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-43590120/original/f4b7563b-3ba6-41ba-a7d7-a5f0e21dd5c9.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-41558384/original/7c2cb844-b0b6-48d0-bdc1-3744dcf218bd.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-580318850330446895/original/984d950b-33c7-4e3e-916b-a586cf71a28c.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50944616/original/174f22d1-fe22-422d-91a3-d8d8e68418b9.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-577711052770290256/original/a6f3fb76-50e5-4582-adbf-934dc0da2dde.jpeg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/9cca0574-0703-4340-984b-bab0f46e7d6c.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/1e64cb01-7e9d-45e4-a545-9f34df11790f.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/47626242-3b29-4010-882e-cf91ec898880.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/83738e60-4654-4faa-af1a-f53d02acbe6c.jpg",
        preview: true
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
