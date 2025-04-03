const router = require('express').Router();
const ctrl = require('../controllers/visit.controller');

router.get('/', ctrl.getAll);
router.post('/save/', ctrl.create);
router.put('/update/:id', ctrl.update);
router.put('/status/:id', ctrl.toggleEstado);

module.exports = router;
