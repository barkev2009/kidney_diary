const ApiError = require('../error/ApiError');
const { User, UserParameter, Item } = require('../models/models');
const { calculateRatings } = require('../utils/calculateRatings');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const uuidLib = require('uuid');

const recalculateRatings = async (userId) => {
    // const items = await Item.findAll({ where: { userId } });
    // let item;
    // for (let i = 0; i < items.length; i++) {
    //     item = items[i];
    //     const { water_rating, steps_rating, total_rating } = await calculateRatings({ water: item.water, steps: item.steps });
    //     await Item.update(
    //         { water_rating, steps_rating, total_rating },
    //         { where: { uuid: item.uuid } }
    //     );
    // }
    // return true;
}

class UserParameterController {
    async create(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid, limit_min, limit_max, rating, type } = req.body;

                const user = await User.findOne({ where: { uuid } });
                if (!user) {
                    return next(ApiError.badRequest(`Пользователя с uuid ${uuid} не существует`));
                }

                const userParameter = await UserParameter.create({
                    userId: user.id, uuid: uuidLib.v4(), limit_min, limit_max, rating, type
                });
                // console.log('HERE');
                await recalculateRatings(user.id);

                return resp.json(userParameter)
            }, req, resp, next, 'UserParameterController.create'
        )
    }

    async edit(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;
                const { limit_min, limit_max, rating, type } = req.body;

                const userParameter = await UserParameter.findOne({ where: { uuid } });
                if (!userParameter) {
                    return next(ApiError.badRequest(`Параметра с uuid ${uuid} не существует`));
                }
                const result = await UserParameter.update(
                    { limit_min, limit_max, rating, type },
                    { where: { uuid } }
                );

                await recalculateRatings(userParameter.userId);

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
                await recalculateRatings(userParameter.userId);

                return resp.json({ userParameter, success: true })
            }, req, resp, next, 'UserParameterController.delete'
        )
    }
}

module.exports = new UserParameterController();