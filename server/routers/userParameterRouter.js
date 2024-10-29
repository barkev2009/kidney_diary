const Router = require('express');
const router = new Router();
const userParameterController = require('../controllers/userParameterController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, userParameterController.create);
router.put('/:uuid', authMiddleware, userParameterController.edit);
router.delete('/:uuid', authMiddleware, userParameterController.delete);
router.get('/uuid/:uuid', authMiddleware, userParameterController.get);
router.get('/user/:uuid', authMiddleware, userParameterController.getByUser);

module.exports = router;