const db = require("../models");
const { guru: Guru, mapel: Mapel } = db;

exports.getGuru = async (req, res) => {
    try {
        const response = await Guru.findAll({
            attributes: ['id', 'nip', 'name', 'tgl_lahir', 'jkg', 'alamat', 'mapelId'],
            include: [{
                model: Mapel,
                attributes: ['id', 'name_mapel'],
                as: "mapel"
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getGuruById = async (req, res) => {
    try {
        const guru = await Guru.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!guru) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await Guru.findOne({
            attributes: ['id', 'nip', 'name', 'tgl_lahir', 'jkg', 'alamat', 'mapelId'],
            include: [{
                model: Mapel,
                attributes: ['id', 'name_mapel'],
                as: "mapel"
            }],
            where: {
                id: guru.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createGuru = async (req, res) => {
    const { nip, name, tgl_lahir, jkg, alamat, mapelId } = req.body;
    const nipGuru = await Guru.findOne({
        where: {
            nip: req.body.nip
        }
    });
    if (nipGuru) return res.status(404).json({ msg: 'NIP Yang Anda Masukkan Sudah Tersedia...' });
    try {
        await Guru.create({
            nip: nip,
            name: name,
            tgl_lahir: tgl_lahir,
            jkg: jkg,
            alamat: alamat,
            mapelId: mapelId
        });
        res.status(201).json({ msg: "Guru Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateGuru = async (req, res) => {
    try {
        const guru = await Guru.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!guru) return res.status(404).json({ msg: "Data tidak ditemukan" });
        await Guru.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Guru Updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteGuru = async (req, res) => {
    try {
        await Guru.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Guru Deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}