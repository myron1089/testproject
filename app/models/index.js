require('dotenv').config(); 
const mysql = require('mysql2');
const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
//  process.env.DB =process.argv[2];
//  process.env.USER=process.argv[3];

//   // process.env.PASSWORD=process.argv[4];
//  process.env.HOST=process.argv[4];

//  const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Please enter the USER : ', (answer1) => {
//     rl.question('Please enter the PASSWORD : ', (answer2) => {
//       rl.question('Please enter the second HOST : ', (answer3) => {
//         rl.question('Please enter the second DB : ', (answer4) => {
  
//   process.env.USER=answer1;
//   process.env.PASSWORD=answer2;
//   process.env.HOST=answer3;
//   process.env.DB =answer4; 
//         // console.log(`The sum of above two numbers is ${result}`);
//         rl.close();
//     });
//   });
// });
// });
// const sequelize = new Sequelize(
//    process.env.DB ,
//    process.env.USER|| 'root',
//    process.env.PASSWORD,
//   {
//     host:  process.env.HOST,
//     dialect: "mysql",
//     operatorsAliases: 0,
//     define: { timestamps: false },
//     pool: {
//       max: 10,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }

// );
const sequelize = new Sequelize(
  dbConfig.DB ,
  dbConfig.USER|| 'root',
  dbConfig.PASSWORD,
 {
   host:  dbConfig.HOST,
   dialect: "mysql",
   operatorsAliases: 0,
   define: { timestamps: false },
   pool: {
     max: 10,
     min: 0,
     acquire: 30000,
     idle: 10000
   }
 }

);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model")(sequelize,Sequelize);
const User_Roles = sequelize.define('user_roles', {}, { timestamps: false });
db.User_Roles = User_Roles;
//create relationship many to many
db.role.belongsToMany(db.user, {
  through: User_Roles
});
db.user.belongsToMany(db.role, {
  through: User_Roles
});

//create relationship one to many
db.user.hasMany(db.post,{as:"posts"});
db.post.belongsTo(db.user,{
  foreignKey: "userId",
  as: "user",
});
// //Connect to db
// const connection = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD
//   // user: process.env.USER,
//   //password: process.env.PASSWORD,

// });
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD
  // user: process.env.USER,
  //password: process.env.PASSWORD,

});
//Create Database
connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`);
connection.query("SET SESSION wait_timeout = 604800");

//Set Roles
db.ROLES = ["user", "admin"];

module.exports = db;
