'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const { User, Spot, Review } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Reviews';
    return await queryInterface.bulkInsert(options,
      [
        {
          spotId: 1,
          userId: 4,
          review: "Great location, pleasant and spacious with amazing views. Hard to find this combo in Laguna.",
          stars: 5
        },
        {
          spotId: 1,
          userId: 5,
          review: "Absolutely perfect location and home. Wish we could have stayed longer!",
          stars: 5
        },
        {
          spotId: 1,
          userId: 2,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 4
        },
        {
          spotId: 2,
          userId: 3,
          review: "Cannot beat the location! Fantastic, very clean, very comfortable. We cannnot wait to plan a second stay!",
          stars: 5
        },
        {
          spotId: 2,
          userId: 5,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 5
        },
        {
          spotId: 2,
          userId: 4,
          review: "The room needs to be cleaner.",
          stars: 3
        },
        {
          spotId: 3,
          userId: 2,
          review: "Great view and location. AC and mini fridge were very nice to have. I had no issues with the water/shower pressure in the bathroom. Really enjoyed it!",
          stars: 5
        },
        {
          spotId: 3,
          userId: 4,
          review: "Clean room, comfortable beds. Everything else as described. Small shower with drainage issues, building in need of repair, and bright outdoor lights that cannot be dimmed.",
          stars: 4
        },
        {
          spotId: 3,
          userId: 5,
          review: "It was hard to believe that a place so special in the photos could live up to our expectations in reality.",
          stars: 5
        },
        {
          spotId: 4,
          userId: 2,
          review: "If you are looking for a mediocre, subpar, and non memorable experience then you need to find somewhere else! THIS CABIN IS AWESOME IN EVERY WAY!",
          stars: 5
        },
        {
          spotId: 4,
          userId: 5,
          review: "This amazing cabin is the hosts' personal getaway and they have chosen to make it available to lucky Airbnb guests as well.",
          stars: 4
        },
        {
          spotId: 4,
          userId: 4,
          review: "It can be better.",
          stars: 3
        },
        {
          spotId: 5,
          userId: 2,
          review: "Beautifully located hillside, the house was designed to optimize views of the ocean. In the morning from the living room we enjoyed watching pods of dolphins swim by.",
          stars: 5
        },
        {
          spotId: 5,
          userId: 5,
          review: "It was hard to believe that a place so special in the photos could live up to our expectations in reality. There was so much room to either spread out or congregate.",
          stars: 5
        },
        {
          spotId: 5,
          userId: 3,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 5
        },
        {
          spotId: 6,
          userId: 2,
          review: "Absolutely perfect location and home. Wish we could have stayed longer!",
          stars: 5
        },
        {
          spotId: 6,
          userId: 3,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 4
        },
        {
          spotId: 6,
          userId: 5,
          review: "Cannot beat the location! Fantastic, very clean, very comfortable. We cannnot wait to plan a second stay!",
          stars: 5
        },
        {
          spotId: 7,
          userId: 5,
          review: "I recommend anyone to have this experience.",
          stars: 5
        },
        {
          spotId: 7,
          userId: 4,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 4
        },
        {
          spotId: 7,
          userId: 3,
          review: "Cannot beat the location! Fantastic, very clean, very comfortable. We cannnot wait to plan a second stay!",
          stars: 5
        },
        {
          spotId: 8,
          userId: 5,
          review: "I recommend anyone to have this experience.",
          stars: 5
        },
        {
          spotId: 8,
          userId: 4,
          review: "The towels are dirty but other than that, everything is fine",
          stars: 3
        },
        {
          spotId: 8,
          userId: 3,
          review: "Will be staying here again and recommending to friends!",
          stars: 5
        },
        {
          spotId: 9,
          userId: 5,
          review: "I recommend anyone to have this experience.",
          stars: 5
        },
        {
          spotId: 9,
          userId: 4,
          review: "The towels are dirty but other than that, everything is fine",
          stars: 4
        },
        {
          spotId: 9,
          userId: 2,
          review: "Will be staying here again and recommending to friends!",
          stars: 5
        },
        {
          spotId: 10,
          userId: 5,
          review: "Our stay was wonderful.",
          stars: 5
        },
        {
          spotId: 10,
          userId: 4,
          review: "The water pressure is low but other than that, everything is fine",
          stars: 4
        },
        {
          spotId: 10,
          userId: 3,
          review: "Will be staying here again and recommending to friends!",
          stars: 5
        },
        {
          spotId: 11,
          userId: 5,
          review: "Absolutely perfect location and home. Wish we could have stayed longer!",
          stars: 5
        },
        {
          spotId: 11,
          userId: 2,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 4
        },
        {
          spotId: 11,
          userId: 3,
          review: "Cannot beat the location! Fantastic, very clean, very comfortable. We cannnot wait to plan a second stay!",
          stars: 5
        },
        {
          spotId: 12,
          userId: 5,
          review: "Absolutely perfect location and home. Wish we could have stayed longer!",
          stars: 5
        },
        {
          spotId: 12,
          userId: 2,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 4
        },
        {
          spotId: 12,
          userId: 3,
          review: "Cannot beat the location! Fantastic, very clean, very comfortable. We cannnot wait to plan a second stay!",
          stars: 4
        },
        {
          spotId: 13,
          userId: 5,
          review: "Absolutely perfect location and home. Wish we could have stayed longer!",
          stars: 5
        },
        {
          spotId: 13,
          userId: 2,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 5
        },
        {
          spotId: 13,
          userId: 3,
          review: "Cannot beat the location! Fantastic, very clean, very comfortable. We cannnot wait to plan a second stay!",
          stars: 5
        },
        {
          spotId: 14,
          userId: 5,
          review: "Absolutely perfect location and home. Wish we could have stayed longer!",
          stars: 5
        },
        {
          spotId: 14,
          userId: 2,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 5
        },
        {
          spotId: 14,
          userId: 3,
          review: "It can be better. ",
          stars: 3
        },
        {
          spotId: 15,
          userId: 5,
          review: "Absolutely perfect location and home. Wish we could have stayed longer!",
          stars: 4
        },
        {
          spotId: 15,
          userId: 2,
          review: "What a great way to vacation! Location was amazing. Would highly recommend.",
          stars: 5
        },
        {
          spotId: 15,
          userId: 4,
          review: "Cannot beat the location! Fantastic, very clean, very comfortable. We cannnot wait to plan a second stay!",
          stars: 5
        }

      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options);
  }
};
