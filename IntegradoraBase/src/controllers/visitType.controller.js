const service = require('../services/visitType.service');

exports.getAll = async (req, res) => {
  try {
    const tipos = await service.getAll();
    res.json(tipos);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.create = async (req, res) => {
  try {
    const tipo = await service.createOne(req.body);
    res.status(201).json(tipo);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await service.updateOne(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

exports.remove = async (req, res) => {
  try {
    await service.deleteOne(req.params.id);
    res.json({ message: 'Tipo de visita eliminado' });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
