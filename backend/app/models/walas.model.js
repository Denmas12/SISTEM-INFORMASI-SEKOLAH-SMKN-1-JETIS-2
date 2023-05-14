module.exports = (sequelize, Sequelize) => {
    const Walas = sequelize.define("walas", {
        guruId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        kelassId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        thnAjarId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });

    return Walas;
};