const service = require('../services/visit.service');

exports.getAll = async (req, res) => {
  try {
    const data = await service.getVisits(req.query.estado);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.create = async (req, res) => {
  try {
    const visit = await service.createVisit(req.body);
    res.status(201).json(visit);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await service.updateVisit(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

exports.toggleEstado = async (req, res) => {
  try {
    await service.toggleEstado(req.params.id);
    res.json({ message: 'Estado cambiado correctamente' });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
