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
        ownerId: 2,
        address: "333 Park Ave",
        city: "South Fork",
        state: "Colorado",
        country: "US",
        lat: 31.1,
        lng: 118.7,
        name: "Posh mansion with antique decor",
        description: "Enjoy getting lost in the romance of exploring this three-story Victorian mansion with hidden nooks and antique adornments.",
        price: 506
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
      },
      {
        ownerId: 4,
        address: "Via Scuderlando 6",
        city: "Provincia di Lecce",
        state: "Puglia",
        country: "Italy",
        lat: 34.1,
        lng: 103.7,
        name: "Masseria Quadrelli villa with private pool",
        description: "The Masseria Quadrelli is located just 10 km from Otranto and a few km from Santa Cesarea Terme, a well-known resort known for its spa and the beautiful sea",
        price: 462
      },
      {
        ownerId: 2,
        address: "256 Havard Street",
        city: "Burnsville",
        state: "North Carolina",
        country: "US",
        lat: 34.2,
        lng: 118.4,
        name: "Escape to this Victorian Countryside Mansion",
        description: "Slip away to the comfort and seclusion of the Possum Trot Inn, a 19th Century Victorian mansion",
        price: 438
      },
      {
        ownerId: 2,
        address: "28 Eden",
        city: "Athens",
        state: "Texas",
        country: "US",
        lat: 34.5,
        lng: 118.5,
        name: "Tara Winery - Stagecoach Room",
        description: "This is a spacious room with a king size bed, an attached bath, and access to the back terrace and balcony",
        price: 364
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
        ownerId: 2,
        address: "21 Sand Road",
        city: "Rockaway Beach",
        state: "Oregon",
        country: "US",
        lat: 34.1,
        lng: 114.7,
        name: "NEW 6400 SQFT BEACH MANSION",
        description: "Reserve now for your luxury year round gathering at IBB Beach Mansion, possibly the largest house available for rent on the Oregon Coast ",
        price: 802
      },
      {
        ownerId: 4,
        address: "17 Flower Street",
        city: "Catskill",
        state: "New York",
        country: "US",
        lat: 34.1,
        lng: 118.7,
        name: "River House by AvantStay",
        description: "Follow a one-mile-long private driveway through groves of Walnut and alongside the Corlear Creek to reach this expansive estate.",
        price: 1097
      },
      {
        ownerId: 4,
        address: "Pedregal de Tizayuca 15",
        city: "Cancún",
        state: "Quintana Roo",
        country: "Mexico",
        lat: 34.1,
        lng: 118.7,
        name: "Villa Sha",
        description: "This shoreside Cancún villa boasts an impressive, Aztec-inspired facade, with contoured white gates crowned by palm leaves and the pale Mexican sky. ",
        price: 1680
      },
      {
        ownerId: 4,
        address: "2 Munroe Rd",
        city: "Montego Bay",
        state: "Saint James",
        country: "Jamaica",
        lat: 34.1,
        lng: 111.7,
        name: "Harmony Hill at Tryall Club",
        description: " The villa combines Jamaica’s rich architectural tradition with the latest modern amenities and five star service.",
        price: 2925
      },
      {
        ownerId: 4,
        address: " Ave 28 Calabazar",
        city: "La Habana",
        state: "La Habana",
        country: "Cuba",
        lat: 30.1,
        lng: 118.7,
        name: "Lavillateresa standard room 7",
        description: "This Villa is located at the  top of Loma del  Mazo  and  offers  superb views  of  all Havana, a  panoramic  view",
        price: 110
      },
      {
        ownerId: 3,
        address: "3289 Rock Road",
        city: "Langley",
        state: "Kentucky",
        country: "US",
        lat: 32.1,
        lng: 118.2,
        name: "The Bluegrass Palace",
        description: "There is a special place, nestled amidst the rolling hills of Kentucky bluegrass, where 29,000 square feet of unmitigated luxury welcomes you.",
        price: 820
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
