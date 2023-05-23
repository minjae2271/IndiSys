module.exports = (Sequelize, DataTypes) => {
    const Company = Sequelize.define('Company', {
        company_name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Company.associate = (db) => {

    };
    return Company;
}