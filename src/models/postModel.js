const db = require('../common/knex');
const { paginate } = require('../helpers/dbUtils');

const addPost = async (post) => {
    const { title, content } = post;
    return await db('posts')
        .insert({
            title,
            content,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        });
}

const updatePost = async (post) => {
    const { id, title, content } = post;
    return await db('posts')
        .update({
            title,
            content,
            updated_at: db.fn.now()
        }).where({ id });
}

const getPostById = async (id) => {
    return await db('posts')
        .select()
        .where({ id })
        .first();
}

const getPostByPage = async (limit, pageNum) => {
    return await paginate(
        db('posts')
            .select(),
        { limit, pageNum }
    );
}

const deletePost = async (id) => {
    return await db('posts').where({ id }).del();
}

module.exports = {
    addPost,
    getPostById,
    updatePost,
    getPostByPage,
    deletePost
}