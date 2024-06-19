'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    static associate(models) {
      Medication.belongsTo(models.User, { foreignKey: 'user_id' });
      Medication.hasMany(models.MedicationLog, { foreignKey: 'medication_id' });
      Medication.hasMany(models.EmailNotification, { foreignKey: 'medication_id' });
    }
  }
  Medication.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    notes: DataTypes.STRING,
    file_path: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY, // if only one time thant start_date = end_date
    time: DataTypes.TIME,
    recurrence: DataTypes.STRING,  // daily or weekly or oto
    day_of_week: DataTypes.STRING, // if weekly then day (mon,tue,fri....)
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
    modelName: 'Medication',
    timestamps: false
  });
  return Medication;
};
