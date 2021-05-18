module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define("admin", {
        username: {
            unique: true,
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
    });

    return admin;
};