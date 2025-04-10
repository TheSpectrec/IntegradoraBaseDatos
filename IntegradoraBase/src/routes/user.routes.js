const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller.js');

router.get('/', controller.getAll);
router.post('/save', controller.create);
router.put('/update/:id', controller.update);
router.put('/status/:id', controller.toggleEstado);
router.post('/login', controller.login);
router.get("/check-username", controller.checkUsername);
router.get("/check-phone", controller.checkPhone);
router.post('/login-mobile', controller.loginUser); // ← para la app móvil



module.exports = router;
