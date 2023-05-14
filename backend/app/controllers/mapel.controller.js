const db = require("../models");
const { mapel: Mapel, guru: Guru } = db;

exports.getMapel = async (req, res) => {
    try {
        const response = await Mapel.findAll({
            attributes: ['id', 'name_mapel'],
            include: [{
                model: Guru,
                attributes: ['id', 'name'],
                as: "guru"
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getMapelById = async (req, res) => {
    try {
        const jurusan = await Mapel.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jurusan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await Mapel.findOne({
            attributes: ['id', 'name_mapel'],
            where: {
                id: jurusan.id
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createMapel = async (req, res) => {
    const { name_mapel } = req.body;
    try {
        await Mapel.create({
            name_mapel: name_mapel,
        });
        res.status(201).json({ msg: "Mata Pelajaran Created" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateMapel = async (req, res) => {
    try {
        await Mapel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Mata Pelajaran Updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteMapel = async (req, res) => {
    try {
        await Mapel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Mata Pelajaran Deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}