'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Medication, { foreignKey: 'user_id' });
      User.hasMany(models.MedicationLog, { foreignKey: 'user_id' });
      User.hasMany(models.Session, { foreignKey: 'user_id' });
      User.hasMany(models.EmailNotification, { foreignKey: 'user_id' });
      User.hasMany(models.Report, { foreignKey: 'user_id' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    mobile_number: DataTypes.STRING,
    salt: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};
