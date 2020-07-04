const db = require('../common/knex');

const getProviders = async () => {
    return await db('providers')
        .select()
        .orderBy('name', 'asc');
}

const getProductTypes = async () => {
    return await db('product_type')
        .select()
        .orderBy('product_type_name', 'asc');
}

const getAttributeByProductTypeId = async (id) => {
    return await db('product_attributes')
        .select(
            'product_attributes.id',
            'product_attributes.product_type_id',
            'product_attributes.category_attribute_id',
            'category_attributes.category_name',
        ).innerJoin(
            'category_attributes',
            'category_attributes.id',
            'product_attributes.category_attribute_id',
        ).where({
            'product_type_id': id,
        }).orderBy('product_attributes.created_at', 'desc');
}

const getAttributeNotAdded = async (id) => {
    return await db('category_attributes')
        .select()
        .whereNotIn(
            'id',
            db('product_attributes')
                .select('category_attribute_id as id')
                .where({
                    'product_type_id': id,
                }))
        .orderBy('category_name', 'asc');
}

const addProductType = async (name) => {
    return await db('product_type')
        .insert({
            product_type_name: name,
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
        });
}

const addProvider = async (name) => {
    return await db('providers')
        .insert({
            name,
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
        });
}

const addProductAttribute = async (name) => {
    return await db('category_attributes')
        .insert({
            category_name: name,
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
        });
}

const addProductTypeAttribute = async (product_type_id, category_attribute_id) => {
    return await db('product_attributes')
        .insert({
            product_type_id,
            category_attribute_id,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        });
}

const removeProductTypeAttribute = async (product_type_id, category_attribute_id) => {
    return await db('product_attributes')
        .where({
            product_type_id,
            category_attribute_id,
        }).del();
}

const getAttributeValueBy = async (product_type_id, category_name)=>{
    return await db('product_attributes')
    .innerJoin('category_attributes', 'product_attributes.category_attribute_id', 'category_attributes.id')
    .innerJoin('attribute_values','product_attributes.id', 'attribute_values.product_attribute_id')
    .where('product_attributes.product_type_id', product_type_id)
    .where('category_attributes.category_name', category_name)
    .distinct(
        'attribute_values.product_attribute_id',
        'attribute_values.value'
    )
    .select()
    .orderBy('attribute_values.value', 'desc');
}

module.exports = {
    getProviders,
    getProductTypes,
    getAttributeByProductTypeId,
    getAttributeNotAdded,
    addProductType,
    addProvider,
    addProductAttribute,
    addProductTypeAttribute,
    removeProductTypeAttribute,
    getAttributeValueBy,
}