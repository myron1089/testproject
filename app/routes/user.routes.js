const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  //Retvieve all Posts
  app.get("/api/user", controller.findAll);
  //Retrieve  a single User with id
  app.get("/api/user/:id", controller.findOne);

  //Update User with id
  app.put("/api/user/:id", controller.update);

  //Delete a User with id
  app.delete("/api/user/:id", controller.delete);

  //Delete all User
  app.delete("/api/user", controller.deleteAll);
};