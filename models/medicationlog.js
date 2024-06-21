'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicationLog extends Model {
    static associate(models) {
      MedicationLog.belongsTo(models.Medication, { foreignKey: 'medication_id' });
      MedicationLog.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  MedicationLog.init({
    medication_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    taken_at: DataTypes.DATE,
    link : DataTypes.STRING,
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
    modelName: 'MedicationLog',
    timestamps: false
  });
  return MedicationLog;
};
