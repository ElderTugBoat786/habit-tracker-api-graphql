const { gql } = require('apollo-server');

const typeDefs = gql`

  type Habit {
    id : ID
    name: String
    startDate : String,
    count : Int,
    rate: Float
    habitData : [HabitData]
  }

  type HabitData {
    id : ID
    habitId : Int
    date : String
  }

  type Result{
    status : Int,
    message : String
  }

  type Query {
    habits: [Habit]!
    habitsData(id : Int) : [HabitData]!
    habitData : [HabitData]
  }

  type Mutation {
    addHabit(name: String!, startDate : String ) : Habit
    removeHabit(habitId : Int!) : Result
    addHabitData(habitId : Int!) : HabitData
    removeHabitData(habitDataId : Int!) : Result
  }
`;

module.exports = typeDefs;
