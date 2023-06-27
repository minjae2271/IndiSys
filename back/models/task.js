module.exports = (Sequelize, DataTypes) => {
    const Task = Sequelize.define('Task', {
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        done_date: {
            type: DataTypes.DATEONLY,
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
        db.Task.hasMany(db.Image);
    };
    return Task;
}