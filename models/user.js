'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    mobilephone: DataTypes.STRING(20),
    email: DataTypes.STRING(255),
    firstname: DataTypes.STRING(255),
    lastname: DataTypes.STRING(255),
    gender: DataTypes.STRING(255),
    dateofbirth: DataTypes.DATE
  }, {
    tableName: 'user',
    timestamps: false,
    schema: 'public'
  });
  return User;
};