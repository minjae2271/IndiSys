module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: { 
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    User.associate = (db) => {
        db.User.hasMany(db.Task);
    };
    return User;
}