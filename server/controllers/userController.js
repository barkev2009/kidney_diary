const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const uuidLib = require('uuid');
const { User } = require('../models/models');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const generateJWT = require('../utils/generateJWT');

class UserController {
    async register(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { login, password, name } = req.body;

                if (!login) {
                    return next(ApiError.badRequest('Некорректный логин'));
                }

                const candidate = await User.findOne({ where: { login } });
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
                }

                const hashPassword = await bcrypt.hash(password, 5);
                const uuid = uuidLib.v4();
                const user = await User.create({ login, password: hashPassword, name, uuid });
                const token = generateJWT(user.uuid, user.login, user.name);

                return resp.json({ token })
            }, req, resp, next, 'UserController.register'
        )
    }

    async login(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { login, password } = req.body;
                const candidate = await User.findOne({ where: { login } });

                if (!candidate) {
                    return next(ApiError.internalError('Пользователь не найден'))
                }

                let comparePassword = bcrypt.compareSync(password, candidate.password);
                if (!comparePassword) {
                    return next(ApiError.internalError('Неверный пароль'))
                }

                const token = generateJWT(candidate.uuid, candidate.login, candidate.name);
                return resp.json({ token })
            }, req, resp, next, 'UserController.login'
        )
    }

    async checkAuth(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const token = generateJWT(req.user.id, req.user.login, req.user.name);
                return resp.json({ token })
            }, req, resp, next, 'UserController.checkAuth'
        )
    }
}

module.exports = new UserController();