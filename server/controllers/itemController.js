const ApiError = require('../error/ApiError');
const { User, Item, UserParameter } = require('../models/models');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const uuidLib = require('uuid');
const { Op } = require('sequelize')

const calculateRatings = async ({ water, steps }) => {
    const userParameter = await UserParameter.findOne(
        {
            where: {
                water_min: { [Op.lte]: water },
                [Op.or]: {
                    water_max: { [Op.gte]: water },
                    water_max: null
                },
                steps_min: { [Op.lte]: steps },
                [Op.or]: {
                    steps_max: { [Op.gte]: steps },
                    steps_max: null
                }
            }
        }
    );
    if (userParameter) {
        return {
            water_rating: userParameter.water_rating,
            steps_rating: userParameter.steps_rating,
            total_rating: Math.floor((userParameter.water_rating + userParameter.steps_rating) / 2)
        }
    }
    return {
        water_rating: 0,
        steps_rating: 0,
        total_rating: 0
    }
}

class ItemController {
    async create(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;
                const { date, water, steps } = req.body;

                const user = await User.findOne({ where: { uuid } });
                if (!user) {
                    return next(ApiError.badRequest(`Пользователя с uuid ${uuid} не существует`));
                }

                const { water_rating, steps_rating, total_rating } = calculateRatings({ water, steps });
                const item = await Item.create({
                    userId: user.id, uuid: uuidLib.v4(),
                    date, water, steps, water_rating, steps_rating, total_rating
                });

                return resp.json(item)
            }, req, resp, next, 'ItemController.create'
        )
    }

    async edit(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;
                const { date, water, steps } = req.body;

                const item = await Item.findOne({ where: { uuid } });
                if (!item) {
                    return next(ApiError.badRequest(`Записи с uuid ${uuid} не существует`));
                }
                const { water_rating, steps_rating, total_rating } = calculateRatings({ water, steps });
                const result = await Item.update(
                    { date, water, steps, water_rating, steps_rating, total_rating },
                    { where: { uuid } }
                );

                return resp.json(result)
            }, req, resp, next, 'ItemController.edit'
        )
    }

    async get(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;
                const item = await Item.findOne({ where: { uuid } });
                return resp.json(item)
            }, req, resp, next, 'ItemController.get'
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
                const items = await Item.findAll({ where: { userId: user.id } });

                return resp.json(items)
            }, req, resp, next, 'ItemController.getByUser'
        )
    }

    async delete(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { uuid } = req.params;

                const item = await Item.findOne({ where: { uuid } });
                if (!item) {
                    return next(ApiError.badRequest(`Записи с uuid ${uuid} не существует`));
                }
                await Item.destroy({ where: { uuid } });

                return resp.json({ item, success: true })
            }, req, resp, next, 'ItemController.delete'
        )
    }
}

module.exports = new ItemController();