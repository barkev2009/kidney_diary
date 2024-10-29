const { UserParameter } = require("../models/models");
const { Op } = require('sequelize');

const calculateRatings = async ({ water, steps }) => {
    // const userParameter = await UserParameter.findOne(
    //     {
    //         where: {
    //             water_min: { [Op.lte]: water },
    //             [Op.or]: {
    //                 water_max: { [Op.gte]: water },
    //                 water_max: null
    //             },
    //             steps_min: { [Op.lte]: steps },
    //             [Op.or]: {
    //                 steps_max: { [Op.gte]: steps },
    //                 steps_max: null
    //             }
    //         }
    //     }
    // );
    // if (userParameter) {
    //     return {
    //         water_rating: userParameter.water_rating,
    //         steps_rating: userParameter.steps_rating,
    //         total_rating: Math.ceil((userParameter.water_rating + userParameter.steps_rating) / 2)
    //     }
    // }
    return {
        water_rating: 0,
        steps_rating: 0,
        total_rating: 0
    }
}

module.exports = { calculateRatings };