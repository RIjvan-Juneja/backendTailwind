'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {'use strict';
    const { Model } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
      class Report extends Model {
        static associate(models) {
          Report.belongsTo(models.User, { foreignKey: 'user_id' });
        }
      }
      Report.init({
        user_id: DataTypes.INTEGER,
        report_date: DataTypes.DATE,
        report_data: DataTypes.STRING,
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
        modelName: 'Report',
        timestamps: false
      });
      return Report;
    };
    
    }
  }
  Report.init({
    firstName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};