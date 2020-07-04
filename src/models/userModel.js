const db = require('../common/knex');
const { paginate } = require('../helpers/dbUtils');
const helper = require('../helpers/helper');

const addUser = async (user) => {
    return await db('users')
        .insert({
            ...user,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        });
}

const getUserByEmail = async (email) => {
    return await db('users')
        .select()
        .where({ email })
        .first();
}

const getUserById = async (id) => {
    return await db('users')
        .select()
        .where({ id })
        .first();
}

const getUserByPage = async (limit, pageNum, searchValue) => {
    const builder = db('users').where('level', '!=', 2);
    if (searchValue) {
        builder.andWhere('email', 'like', `%${searchValue}%`);
    }
    return await paginate(builder, { limit, pageNum });
}

const deleteUserById = async (id) => {
    return await db('users').where({ id }).del();
}

const getProductFavorites = async (user_id) => {
    console.log(db('products')
        .select(
            'products.id',
            'products.product_name',
            'products.product_images',
            'products.description',
            'products.base_price',
        ).innerJoin(
            'favorites',
            'favorites.product_id',
            'products.id',
        ).where('favorites.customer_id', user_id).toString());
    return await db('products')
        .select(
            'products.id',
            'products.product_name',
            'products.product_images',
            'products.description',
            'products.base_price',
        ).innerJoin(
            'favorites',
            'favorites.product_id',
            'products.id',
        ).where('favorites.customer_id', user_id);
}
const getProductSuggest = async () => {
    return await db('products')
        .select(
            'products.id',
            'products.product_name',
            'products.product_images',
            'products.base_price',
        )
        .limit(6);
}

const addProductFavorite = async (user_id, product_id) => {
    return await db('favorites')
        .insert({
            customer_id: user_id,
            product_id,
            created_at: db.fn.now(),
            updated_at: db.fn.now(),
        });
}

const deleteProductFavorite = async (user_id, product_id) => {
    return await db('favorites')
        .where({
            customer_id: user_id,
            product_id: product_id,
        }).del();
}

const getUserCart = async (user_id) => {
    return await db('carts')
        .select(
            'products.id',
            'products.product_name',
            'products.product_images',
            'products.description',
            'products.base_price',
            'carts.amount',
        ).innerJoin(
            'products',
            'products.id',
            'carts.product_id'
        ).where('carts.customer_id', user_id);
}

const changeAmountProductCart = async (user_id, product_id, amount) => {
    return await db('carts')
        .update({
            amount,
            updated_at: db.fn.now(),
        }).where({
            customer_id: user_id,
            product_id,
        });
}

const deleteProductCart = async (user_id, product_id) => {
    return await db('carts')
        .where({
            customer_id: user_id,
            product_id,
        }).del();
}

const getUserBill = async (user_id) => {
    const resultBills = await db('sale_bills')
        .select(
            'sale_bills.id',
            'user1.full_name as customer_name',
            'user2.full_name as shiper_name',
            'sale_bills.destination_address',
            'sale_bills.delivery_date',
            'sale_bills.book_date',
            'sale_bills.ship_fee',
            db.raw('sum(sale_details.amount * sale_details.unit_price) as bill_value'),
            'sale_bills.status_order',
        ).innerJoin(
            'users as user1',
            'user1.id',
            'sale_bills.customer_id'
        ).leftJoin(
            'users as user2',
            'user2.id',
            'sale_bills.shiper'
        ).innerJoin(
            'sale_details',
            'sale_details.id',
            'sale_bills.id'
        ).where('user1.id', user_id)
        .groupBy('sale_bills.id');

    const resultProducts = await db('sale_details')
        .select(
            'sale_details.id',
            'products.id as product_id',
            'products.product_name',
            'sale_details.unit_price',
            'sale_details.amount',
            'products.product_images',
        ).innerJoin(
            'products',
            'products.id',
            'sale_details.product_id'
        ).whereIn('sale_details.id', resultBills.map(bill => bill.id));

    const bills = resultBills.map(r => ({
        id: r.id,
        customer_name: r.customer_name,
        shiper_name: r.shiper_name,
        book_date: r.book_date,
        delivery_date: r.delivery_date,
        bill_value: r.bill_value,
        status_order: r.status_order,
        products: resultProducts.filter(r1 => r1.id === r.id)
            .map(r2 => ({
                id: r2.product_id,
                product_name: r2.product_name,
                base_price: r2.unit_price,
                amount: r2.amount,
                product_images: r2.product_images,
            })),
    }))

    return new Promise((resolve, reject) => {
        if (bills.length > 0) resolve(bills);
        else reject("Không có dữ liệu đơn hàng");
    });
}

const updatePassword = async (user_id, old_password, new_password) => {
    const password = await db('users')
        .select('passwd')
        .where({ id: user_id })
        .first();
    console.log('old: ', old_password)
    console.log('compare', helper.comparePassword(old_password, password.passwd))
    if (!helper.comparePassword(old_password, password.passwd)) {
        return {
            success: false,
            error: 'mật khẩu không đúng'
        }
    } else {
        const result = await db('users')
            .update({
                passwd: helper.hashPassword(new_password),
                updated_at: db.fn.now(),
            });
    }
}

const updateProfile = async (user_id, valueUpdate) => {
    return await db('users')
        .update({
            ...valueUpdate,
            updated_at: db.fn.now(),
        }).where({ id: user_id }).then(result => {
            console.log(result);
        });
}

const createBillFromCart = async (user_id) => {

}

module.exports = {
    addUser,
    getUserByEmail,
    getUserById,
    getUserByPage,
    deleteUserById,
    getProductFavorites,
    getProductSuggest,
    addProductFavorite,
    deleteProductFavorite,
    getUserCart,
    changeAmountProductCart,
    deleteProductCart,
    getUserBill,
    updatePassword,
    updateProfile,
}