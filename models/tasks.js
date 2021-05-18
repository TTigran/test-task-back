module.exports = (sequelize, DataTypes) => {
    const tasks = sequelize.define("tasks", {
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER
        },
    });

    return tasks;
};


