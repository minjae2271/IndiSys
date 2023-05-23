module.exports = (Sequelize, DataTypes) => {
    const Task = Sequelize.define('Task', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        task_text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Task.associate = (db) => {
        db.Task.belongsTo(db.User);
    };
    return Task;
}