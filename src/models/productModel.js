const db = require('../common/knex');
const { paginate } = require('../helpers/dbUtils');

const getProductAdminByPage = async (limit, pageNum, searchValue, filter) => {
    const whereClause = {};
    const { provider, product_type } = filter;
    if (provider) {
        whereClause['products.provider_id'] = provider;
    }
    if (product_type) {
        whereClause['products.product_type_id'] = product_type;
    }
    console.log("WhereClauseProductAmin: ", whereClause);
    const builder = db('products').select(
        'products.id',
        'products.product_name',
        'products.base_price',
        'products.unit',
        'product_type.product_type_name',
        'providers.name as provider_name',
        'products.quantity'
    ).leftJoin(
        'product_type',
        'product_type.id',
        'products.product_type_id'
    ).leftJoin(
        'providers',
        'providers.id',
        'products.provider_id'
    );

    if (searchValue && !whereClause) {
        builder.where('products.product_name', 'like', `%${searchValue}%`);
    }
    if (whereClause) {
        builder.where(whereClause);
        if (searchValue) {
            builder.andWhere('products.product_name', 'like', `%${searchValue}%`);
        }
    }

    return await paginate(
        builder,
        { limit, pageNum }
    );
}

const getTopSellingProducts = async (limit) => {
    return await db('products')
        .innerJoin(db('sale_bills')
            .select(db.raw('product_id, sum(amount) as count'))
            .innerJoin(
                'sale_details',
                'sale_details.id',
                'sale_bills.id'
            ).whereRaw('(sale_bills.book_date between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()) and sale_bills.status_order < 4')
            .groupBy('product_id')
            .limit(limit).as('x'),
            'x.product_id',
            'products.id')
        .select(
            'products.id',
            'products.product_name',
            'products.product_images',
            'products.base_price',
            'products.unit',
            'products.quantity',
            'x.count'
        );
}

const deleteProduct = async (id) => {
    return await db('products').where({ id }).del();
}

const getProductListByProductTypeId = async (product_type_id) => {
    return await db('product_type')
        .where('product_type.id', product_type_id)
        .join('products', 'product_type.id', 'products.product_type_id')
        .join('providers', 'products.provider_id', 'providers.id')
        .select(
            'products.id',
            'products.product_name',
            'products.product_images',
            'products.base_price',
            'products.unit',
            'products.description',
            'products.quantity',
            'providers.name as provider_name',
            'product_type.product_type_name as product_type_name',
        );
}

const addProduct = async (product) => {
    return await db.transaction(function (trx) {
        return db.insert({
            ...product.productInfo,
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
        }).into('products')
            .transacting(trx)
            .then(function (ids) {
                product.attributeValues.forEach(p => {
                    delete p['name'];
                    p['product_id'] = ids[0];
                    p['created_at'] = db.fn.now();
                    p['updated_at'] = db.fn.now();
                });
                return db('attribute_values').insert(product.attributeValues).transacting(trx);
            }).then(trx.commit)
            .catch(trx.rollback);
    });
}

const updateProduct = (id, valueUpdate) => {
    return db('products')
        .update({
            ...valueUpdate,
            updated_at: db.fn.now(),
        }).where({ id });
}

const getProductGuestByPage = async (limit, pageNum, searchValue, filter) => {
    const whereClause = {};
    const { provider, product_type, category_value } = filter;
    const { base_price, search_value, price_between } = searchValue;

    if (provider) {
        whereClause['products.provider_id'] = provider;
    }
    if (product_type) {
        whereClause['products.product_type_id'] = product_type;
    }
    if (category_value) {
        whereClause['attribute_values.value'] = category_value;
    }

    console.log("WhereClauseProductGuest: ", whereClause);
    console.log("SearchValue: ", searchValue);

    const builder = db('products').select(
        'products.id',
        'products.product_name',
        'products.product_images',
        'products.base_price',
        'products.unit',
        'products.description',
        'products.quantity',
        'providers.name as provider_name',
        'providers.id as provider_id',
        'product_type.product_type_name as product_type_name',
    ).leftJoin(
        'product_type',
        'product_type.id',
        'products.product_type_id'
    ).leftJoin(
        'providers',
        'providers.id',
        'products.provider_id'
    )
        .leftJoin('attribute_values', 'products.id', 'attribute_values.product_id');

    if (searchValue && !whereClause) {
        if (search_value)
            builder.where('products.product_name', 'like', `%${search_value}%`);
        if (base_price) {
            builder.orderBy('products.base_price', base_price);
        }
    }
    if (whereClause) {
        builder.where(whereClause);
        if (searchValue) {
            if (search_value)
                builder.where('products.product_name', 'like', `%${search_value}%`);
            if (base_price) {
                builder.orderBy('products.base_price', base_price);
            }
        }
    }
    if (price_between) {
        builder.whereBetween('products.base_price', price_between);
    }

    return await paginate(
        builder,
        { limit, pageNum }
    );
}

const getProductById = async (product_id) => {
    return await db('products')
        .where('products.id', product_id)
        .select(
            'products.id',
            'products.product_name',
            'products.product_images',
            'products.unit',
            'products.base_price',
            'products.description',
            'products.quantity',
        )
        .first();
}

const getProductDetailById = async (product_id) => {
    return await db('attribute_values')
        .where('attribute_values.product_id', product_id)
        .innerJoin('product_attributes', 'attribute_values.product_attribute_id', 'product_attributes.id')
        .innerJoin('category_attributes', 'product_attributes.category_attribute_id', 'category_attributes.id')
        .select(

        );
}

module.exports = {
    getProductAdminByPage,
    getTopSellingProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductListByProductTypeId,
    getProductGuestByPage,
    getProductById
}