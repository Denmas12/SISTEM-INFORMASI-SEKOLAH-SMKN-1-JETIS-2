module.exports = (sequelize, Sequelize) => {
    const Jurusan = sequelize.define("jurusans", {
        name_jurusan: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
    });

    return Jurusan;
};