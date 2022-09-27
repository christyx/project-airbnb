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
     return await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 2,
        address: "123 Main Street",
        city: "Laguna Beach",
        state: "California",
        country: "US",
        lat: 33.5,
        lng: 117.8,
        name: "OCEAN FRONT! Private STAIRS from home to BEACH!",
        description: "Enjoy a unique ocean front experience at our family town home. The front unit sleeps 6 adults. Private access to Laguna Beaches most exclusive beach (Turks Beach) with private stairs connected to the house leading directly to the sand.",
        price: 800
      },
      {
        ownerId: 2,
        address: "123 Ocean Ave",
        city: "Newport Beach",
        state: "California",
        country: "US",
        lat: 33.6,
        lng: 117.9,
        name: "Waterfront Home w/ Beautiful Ocean Views & Beach Access!",
        description: "Get away from it all and indulge in that long-awaited beach vacation! This beautiful rental is located on the upstairs level of a two-story, waterfront home. Enjoy the beautiful ocean and beach views, a fully-equipped kitchen for easy meal preparation, and complimentary internet access! Gather with your group in the inviting living area and plan out your vacation days or watch some TV. This rental also features a furnished deck equipped with an umbrella-covered table.",
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
        name: "Oceanfront Laguna Beach Amazing Views 28",
        description: "Situated on prime oceanfront property, you'll experience peace and ultimate relaxation with breathtaking ocean views and miles of sandy beaches in a furnished 1929 Art Deco spacious studio with a small living room. This light filled studio comfortably sleeps 4 featuring two queen sized beds.",
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
        name: "A-Frame Cabin w Views, Cedar Hot Tub & Sun Deck",
        description: "When you walk into the space you will immediately notice the stunning views from large A-Frame windows, the vaulted wood ceilings, gorgeous wide plank rustic hardwood floors, custom reclaimed wood gourmet kitchen and thoughtful interior design throughout.",
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
        name: "EAGLE'S WATCH MALIBU- Architectural w/ Ocean View",
        description: "Eagle's Watch is one of Malibu's most famous houses, impossible to miss while driving the Pacific Coast Highway and designed by legendary architect Harry Gesner. Perched above the Pacific Ocean, Eagle’s Watch has the best unobstructed panoramic view in Malibu. Perfect for entertaining with dramatic outdoor and indoor spaces, the views from every location are simply stunning. Stay in ultimate luxury in this one of a kind serene modern marvel.",
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
     await queryInterface.bulkDelete('Spots', null, {});
  }
};
