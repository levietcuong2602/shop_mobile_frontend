const db = require('../common/knex');

const getInfoDashboard = async () => {
    const resultUser = await db('users')
        .count('id as totalUser')
        .first();
    const resultPost = await db('posts')
        .count('id as totalPost')
        .first();
    const resultRevenue = await db('sale_details')
        .select(db.raw('sum(unit_price*amount) as revenue'))
        .whereIn('sale_details.id', db('sale_bills')
            .select('id')
            .where({ status_order: 2 })
        ).first();
    return {
        totalUser: resultUser.totalUser,
        totalPost: resultPost.totalPost,
        revenue: resultRevenue.revenue
    };
}

module.exports = {
    getInfoDashboard
}