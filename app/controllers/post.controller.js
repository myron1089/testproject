const db = require("../models");
const Post = db.post;


//Create
exports.create = (req, res) => {

    if (!req.body) {

        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }
    Post.create({
        name: req.body.name,
        description: req.body.description,
        userId: req.body.userId
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the post."
        });
    })
}
//Find All
exports.findAll = (req, res) => {

    Post.findAll({
        include: ["user"]
    }).
        then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving posts."
            });
        });


};

exports.findById = (req, res) => {

    Post.findByPk(req.params.id, { include: ["user"] })
        .then(data => {
            if (!data) {
                res.send.status(404).send({
                    message: "Post not found with id" + req.params.postId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.postId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving Post with id " + req.params.postId
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;
  
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Post with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Post with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Post were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Post."
        });
      });
  };


