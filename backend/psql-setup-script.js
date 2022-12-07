const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});

npm install && npm run build && npm run sequelize --prefix backend db: migrate: undo && npm run sequelize --prefix backend db: migrate && npm run sequelize--prefix backend db: seed: all

npm install && npm run build && npm run sequelize--prefix backend db: migrate && npm run sequelize--prefix backend db: seed: undo && npm run sequelize--prefix backend db: migrate: undo && npm run sequelize--prefix backend db: seed: all
