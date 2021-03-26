module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },


    });
    return Post;
};