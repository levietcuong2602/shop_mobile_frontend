const db = require('../common/knex');
const { paginate } = require('../helpers/dbUtils');

const getBillAdminByPage = async (limit, pageNum, searchValue, filter) => {
    const { date, billType } = filter;
    const builder = db('sale_bills')
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
        ).groupBy('sale_bills.id');
    if (billType) {
        builder.where('sale_bills.status_order', billType);
    }
    if (date) {
        builder.whereBetween('sale_bills.book_date', [date.startDate, date.endDate]);
    }
    if (searchValue) {
        if (billType || date) {
            builder.andWhere(b => b.where('user1.full_name', 'like', `${searchValue}`)
                .orWhere('user2.full_name', 'like', `${searchValue}`));
        } else {
            builder.where(b => b.where('user1.full_name', 'like', `${searchValue}`)
                .orWhere('user2.full_name', 'like', `${searchValue}`));
        }
    }

    return await paginate(
        builder,
        { limit, pageNum }
    );
}

const getBillDetailAdminById = async (id) => {
    const resultOverview = await db('sale_bills')
        .select(
            'sale_bills.id',
            'user1.id as customer_id',
            'user1.full_name as customer_name',
            'user1.phone_number as customer_phone_number',
            'user2.id as shiper_id',
            'user2.full_name as shiper_name',
            'user2.phone_number as shiper_phone_number',
            'user2.address as shiper_address',
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
        ).where('sale_bills.id', id)
        .first();

    const resultBillDetail = await db('sale_details')
        .select(
            'products.id',
            'products.product_name',
            'sale_details.unit_price',
            'sale_details.amount',
            'products.product_images',
        ).innerJoin(
            'products',
            'products.id',
            'sale_details.product_id'
        ).where('sale_details.id', id);

    return {
        customerInfo: {
            id: resultOverview.customer_id,
            name: resultOverview.customer_name,
            phoneNumber: resultOverview.customer_phone_number,
            destinationAddress: resultOverview.destination_address,
        },
        shiperInfo: {
            id: resultOverview.shiper_id,
            name: resultOverview.shiper_name,
            phoneNumber: resultOverview.shiper_phone_number,
            address: resultOverview.shiper_address,
        },
        billInfo: {
            bookDate: resultOverview.book_date,
            deliveryDate: resultOverview.delivery_date,
            value: resultOverview.bill_value,
            shipFee: resultOverview.ship_fee,
            details: resultBillDetail.map(r => ({
                productId: r.id,
                productName: r.product_name,
                unitPrice: r.unit_price,
                amount: r.amount,
                productImages: r.product_images,
            })),
        },
    }
}

const getBillByType = (status_order) => {
    const builder = db('sale_bills')
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
        ).where('sale_bills.status_order', status_order)
        .groupBy('sale_bills.id');
}

module.exports = {
    getBillAdminByPage,
    getBillDetailAdminById,
}