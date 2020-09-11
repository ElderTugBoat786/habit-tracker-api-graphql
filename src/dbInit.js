const dotenv = require("dotenv")

dotenv.config()

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect:  'mysql'
});

const Habit = sequelize.define('Habit',{
  id : { type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true },
  name : {type : DataTypes.STRING(50)},
  startDate : {type : DataTypes.DATE},
  count : {type : DataTypes.INTEGER},
  rate : { type : DataTypes.DOUBLE}
})

const HabitData = sequelize.define('HabitData',{
  id : { type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true },
  habitId : {type : DataTypes.INTEGER},
  date : {type : DataTypes.DATE},
})

sequelize.sync();

module.exports = {sequelize,Habit,HabitData}
