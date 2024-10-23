const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const userParameterRouter = require('./userParameterRouter');
const itemRouter = require('./itemRouter');

router.use('/user', userRouter);
router.use('/userParameter', userParameterRouter);
router.use('/item', itemRouter);

module.exports = router;