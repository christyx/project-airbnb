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
    options.tableName = 'Spots';
    return await queryInterface.bulkInsert(options, [
      {
        ownerId: 3,
        address: "123 Main Street",
        city: "Laguna Beach",
        state: "California",
        country: "US",
        lat: 33.5,
        lng: 117.8,
        name: "Private Stairs from home to Beach!",
        description: "Enjoy a unique ocean front experience at our family town home.",
        price: 800
      },
      {
        ownerId: 3,
        address: "123 Ocean Ave",
        city: "Newport Beach",
        state: "California",
        country: "US",
        lat: 33.6,
        lng: 117.9,
        name: "Waterfront Home & Beach Access!",
        description: "Get away from it all and indulge in that long-awaited beach vacation!",
        price: 360
      },
      {
        ownerId: 3,
        address: "456 Main Street",
        city: "Laguna Beach",
        state: "California",
        country: "US",
        lat: 33.4,
        lng: 117.7,
        name: "Oceanfront For Ultimate Relaxation",
        description: "Situated on prime oceanfront property, you'll experience peace and ultimate relaxation.",
        price: 225,
      },
      {
        ownerId: 3,
        address: "987 Lake Street",
        city: "Lake Arrowhead",
        state: "California",
        country: "US",
        lat: 34.2,
        lng: 117.1,
        name: "A-Frame Cabin W Views",
        description: "When you walk into the space you will immediately notice the stunning views.",
        price: 400
      },
      {
        ownerId: 4,
        address: "888 Hillside",
        city: "Malibu",
        state: "California",
        country: "US",
        lat: 34.1,
        lng: 118.7,
        name: "Architectural w/ Ocean View",
        description: "Eagle's Watch is one of Malibu's most famous houses, impossible to miss while driving.",
        price: 1200
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
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
