'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User, {
        through : 'users_to_group',
        foreignKey: 'groupId'
      })
    }
  }
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagePath: {
      field: 'image_path',
      type: DataTypes.STRING
    },
    description: {type:DataTypes.TEXT}
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    underscored: true
  });
  return Group;
};