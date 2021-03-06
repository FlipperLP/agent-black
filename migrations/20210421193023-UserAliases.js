module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserAliases', {
    aliasID: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    groupingID: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    userID: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    addedBy: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserAliases'),
};
