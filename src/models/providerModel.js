const db = require('../common/knex');

const getProvidersByProducType = async (product_type_id) => {
    return await db('products')
    .where('products.product_type_id', product_type_id)
    .innerJoin('providers', 'products.provider_id', 'providers.id')
    .distinct(
        'providers.id',
        'providers.name',
    )
    .select();
};

module.exports = {
    getProvidersByProducType
};