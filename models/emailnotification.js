'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailNotification extends Model {
    static associate(models) {
      EmailNotification.belongsTo(models.User, { foreignKey: 'user_id' });
      EmailNotification.belongsTo(models.Medication, { foreignKey: 'medication_id' });
    }
  }
  EmailNotification.init({
    user_id: DataTypes.INTEGER,
    medication_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    sent_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'EmailNotification',
    timestamps: false
  });
  return EmailNotification;
};
