const dotenv = require("dotenv")

dotenv.config()

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const { sequelize,  Habit , HabitData } = require('./dbInit');

const resolvers = {
  Query: {
    habits: async () => {
      return await Habit.findAll();
    },
    habitsData: async (_,data) => {
      return await HabitData.findAll();
    },
  },
  Habit: {
    async habitData(parent){
      habitDatas = await HabitData.findAll();
      return habitDatas.filter( habitData => habitData.habitId == parent.id);
    }
  },
  Mutation: {
    addHabit: async (_,data) => {
      return await Habit.create({
        name : data.name,
        startDate : data.startDate != null ? data.startDate : Date.now(),
        count : 0,
        rate : 0.1
      })
    },
    removeHabit: async (_,data) => {
      r = await Habit.destroy({
        where : {
          id : data.habitDataId
        }
      });
      return { status : r, message : ''}
    },
    addHabitData: async (_,data) => {
      return await HabitData.create({
        id : habitsData.length,
        habitId : data.habitId,
        date : Date.now()
      })
    },
    removeHabitData: async (_,data) => {
      r = await HabitData.destroy({
        where : {
          id : data.habitDataId
        }
      });
      return { status : r, message : ''}
    },
  },

};

const server = new ApolloServer({ typeDefs,resolvers });

server.listen({ port : process.env.APOLLO_PORT}).then(({ url }) => {  console.log(`🚀 Server ready at ${url}`);});
