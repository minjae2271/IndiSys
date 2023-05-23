module.exports = (Sequelize, DataTypes) => {
    const Mirror = Sequelize.define('Mirror', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Mirror.associate = (db) => {
        
    };
    return Mirror;
}