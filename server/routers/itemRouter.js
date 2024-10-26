const Router = require('express');
const router = new Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create/:uuid', authMiddleware, itemController.create);
router.post('/get_create/:uuid', authMiddleware, itemController.getByDate);
router.put('/:uuid', authMiddleware, itemController.edit);
router.delete('/:uuid', authMiddleware, itemController.delete);
router.get('/uuid/:uuid', authMiddleware, itemController.get);
router.get('/user/:uuid', authMiddleware, itemController.getByUser);
router.get('/user_year', authMiddleware, itemController.getByUserYear);

module.exports = router;