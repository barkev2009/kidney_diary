const { UserParameter } = require("../models/models");
const { Op } = require('sequelize');

const calculateRating = async ({ type, value }) => {
    if (!value) {
        return 0;
    }
    const userParameter = await UserParameter.findOne(
        {
            where: {
                type,
                [Op.and]: [
                    {
                        [Op.or]: [
                            { limit_max: { [Op.gte]: value } },
                            { limit_max: null }
                        ]
                    },
                    {
                        [Op.or]: [
                            { limit_min: { [Op.lte]: value } },
                            { limit_min: null }
                        ]
                    }
                ]
            }
        }
    );
    if (userParameter) {
        return userParameter.rating;
    }
    return 0;
}

const calculateRatings = async ({ water, steps }) => {
    const water_rating = await calculateRating({ type: 'water', value: water });
    const steps_rating = await calculateRating({ type: 'steps', value: steps });
    const total_rating = water_rating + steps_rating;
    return { water_rating, steps_rating, total_rating }
}

module.exports = { calculateRating, calculateRatings };