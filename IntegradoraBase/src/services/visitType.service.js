const router = require('express').Router();
const ctrl = require('../controllers/visit.controller');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.patch('/estado/:id', ctrl.toggleEstado);

module.exports = router;
