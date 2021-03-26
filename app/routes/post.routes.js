const posts = require("../controllers/post.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //Create a new Post 
    app.post("/api/post", posts.create);

    //Retvieve all Posts
    app.get("/api/post", posts.findAll);

    //Retrieve  a single Post with id
   // app.get("/api/post/:id", posts.findOne);

    //Update Post with id
    app.put("/api/post/:id", posts.update);

    //Delete a Post with id
    app.delete("/api/post/:id", posts.delete);

    //Delete all Posts
    app.delete("/api/post", posts.deleteAll);


}