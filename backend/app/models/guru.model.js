module.exports = (sequelize, Sequelize) => {
    const Guru = sequelize.define("gurus", {
        nip: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        tgl_lahir: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        jkg: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        mapelId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });

    return Guru;
};