const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getAll);
router.post('/save', controller.create);
router.put('/update/:id', controller.update);
router.put('/status/:id', controller.toggleEstado);

module.exports = router;
