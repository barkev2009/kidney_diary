const ApiError = require('../error/ApiError');
const { User, UserParameter } = require('../models/models');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const uuidLib = require('uuid');

class UserParameterController {
    async create(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;

                const user = await User.findOne({ where: { uuid } });
                if (!user) {
                    return next(ApiError.badRequest(`Пользователя с uuid ${uuid} не существует`));
                }

                const userParameter = await UserParameter.create({ userId: user.id, uuid: uuidLib.v4() });

                return resp.json(userParameter)
            }, req, resp, next, 'UserParameterController.create'
        )
    }

    async edit(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;
                const { water_min, water_max, water_rating, steps_min, steps_max, steps_rating } = req.body;

                const userParameter = await UserParameter.findOne({ where: { uuid } });
                if (!userParameter) {
                    return next(ApiError.badRequest(`Параметра с uuid ${uuid} не существует`));
                }
                const result = await UserParameter.update(
                    { water_min, water_max, water_rating, steps_min, steps_max, steps_rating },
                    { where: { uuid } }
                );

                return resp.json(result)
            }, req, resp, next, 'UserParameterController.edit'
        )
    }

    async get(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;
                const userParameter = await UserParameter.findOne({ where: { uuid } });
                return resp.json(userParameter)
            }, req, resp, next, 'UserParameterController.get'
        )
    }

    async getByUser(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;

                const user = await User.findOne({ where: { uuid } });
                if (!user) {
                    return next(ApiError.badRequest(`Пользователя с uuid ${uuid} не существует`));
                }
                const userParameters = await UserParameter.findAll({ where: { userId: user.id } });

                return resp.json(userParameters)
            }, req, resp, next, 'UserParameterController.getByUser'
        )
    }

    async delete(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;

                const userParameter = await UserParameter.findOne({ where: { uuid } });
                if (!userParameter) {
                    return next(ApiError.badRequest(`Параметра с uuid ${uuid} не существует`));
                }
                await UserParameter.destroy({ where: { uuid } });

                return resp.json({ userParameter, success: true })
            }, req, resp, next, 'UserParameterController.delete'
        )
    }
}

module.exports = new UserParameterController();