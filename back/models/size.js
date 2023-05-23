module.exports = (Sequelize, DataTypes) => {
    const Size = Sequelize.define('Size', {
        size: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Size.associate = (db) => {

    };
    return Size;
}