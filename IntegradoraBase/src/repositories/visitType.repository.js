const VisitType = require('../models/visitType.model');

exports.findAll = () => VisitType.find();
exports.findById = id => VisitType.findById(id);
exports.create = data => new VisitType(data).save();
exports.update = (id, data) => VisitType.findByIdAndUpdate(id, data, { new: true });
exports.delete = id => VisitType.findByIdAndDelete(id);
