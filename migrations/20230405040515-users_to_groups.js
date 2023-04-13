'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_to_groups', 
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          field: 'user_id',
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate:'cascade',
          onDelete:'cascade'
        },
        groupId: {
          field: 'group_id',
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'groups',
            key: 'id'
          },
          onUpdate:'cascade',
          onDelete:'cascade'
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
