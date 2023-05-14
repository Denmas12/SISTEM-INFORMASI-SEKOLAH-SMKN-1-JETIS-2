const db = require("../models");
const { jurusan: Jurusan, kelas: Kelas } = db;

exports.getJurusan = async (req, res) => {
    try {
        const response = await Jurusan.findAll({
            attributes: ['id', 'name_jurusan'],
            include: [
                {
                    model: Kelas,
                    attributes: ['id', 'name_kelas'],
                    as: "kelas"
                },

            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getJurusanById = async (req, res) => {
    try {
        const jurusan = await Jurusan.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jurusan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await Jurusan.findOne({
            attributes: ['id', 'name_jurusan'],
            where: {
                id: jurusan.id
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createJurusan = async (req, res) => {
    const { name_jurusan } = req.body;
    try {
        await Jurusan.create({
            name_jurusan: name_jurusan,
        });
        res.status(201).json({ msg: "Jurusan Created" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateJurusan = async (req, res) => {
    try {
        await Jurusan.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Jurusan Updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteJurusan = async (req, res) => {
    try {
        await Jurusan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Jurusan Deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}