const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var bcrypt = require("bcryptjs");
require('dotenv').config(); 





app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const User_Roles = db.User_Roles;
const Role = db.role;
const User = db.user;
const Post = db.post;


// connecttodb();

// //Sync
// function connecttodb(){
db.sequelize.sync({ force: true }).then(() => {
    initialize();

    console.log('Drop and Resync Database with {force:true}');

})



//Simple route
app.get("/", (req, res) => {

    res.json({ message: "Welcome to MyApplication ." });


});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});


function initialize() {

    //Create users
    const admin = User.create({
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345678", 8),

    });



    const user = User.create({
        username: "user",
        email: "user@gmail.com",
        password: bcrypt.hashSync("12345678", 8)

    })
    //Create roles
    const adminrole = Role.create({
        id: 1,
        name: "admin"
    });

    const userrole = Role.create({
        id: 2,
        name: "user"
    });
    //Set roles into users
    const us = User_Roles.create({
        roleId: 1,
        userId: 1,
    }).then(data => {
        console.log("Role success added to User")
    })
        .catch(err => {
            console.log(err.message);
        })

    const ad = User_Roles.create({
        roleId: 2,
        userId: 2,
    }).then(data => {
        console.log("Role success added to Admin")
    })
        .catch(err => {
            console.log(err.message);
        })
    //Create Post
    Post.create({
        name: "Food",
        description: "Delishes",
        userId: 1
    }).then(data => {
        console.log("Post success added ")
    })
        .catch(err => {
            console.log(err.message);
        })
   //Create Post
   Post.create({
    name: "Sport",
    description: "Football event",
    userId: 2
   }).then(data => {
       console.log("Post success added ")
   })
       .catch(err => {  console.log(err.message);
       })
}






