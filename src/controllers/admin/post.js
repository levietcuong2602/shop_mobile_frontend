const express = require("express");
const post_md = require('../../models/postModel');

const route = express.Router();

route.get('/pages', (req, res) => {
    let pageNum = parseInt(req.query.pageNum);
    let limit = parseInt(req.query.limit);

    post_md.getPostByPage(limit, pageNum).then(result => {
        const posts = result.data.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content
        }));
        res.json({ success: true, error: '', posts, pager: result.pager });
    }).catch(error => {
        console.log("error: ", error);
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' })
    });
});

route.get("/getPost/:id", (req, res) => {
    let id = parseInt(req.params.id);

    post_md.getPostById(id).then(post => {
        if (post) {
            res.json({
                success: true, error: '', post: {
                    id: post.id,
                    title: post.title,
                    content: post.content
                }
            });
        } else {
            res.json({ success: false, error: 'Không tìm thấy bài viết' });
        }
    }).catch(error => {
        console.log("error: ", error);
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
    });
});

route.post("/new", (req, res) => {
    let post = req.body;

    post.created_at = new Date();
    post.updated_at = new Date();

    post_md.addPost(post).then(result => {
        res.json({ success: true, error: '' });
    }).catch(error => {
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
    });
});

route.post("/update", (req, res) => {
    let post = req.body;

    post_md.updatePost(post).then(result => {
        res.json({ success: true, error: '' });
    }).catch(error => {
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
    });
});

route.post('/delete', (req, res) => {
    const { id } = req.body;

    post_md.deletePost(id).then(result => {
        res.json({ success: true, error: '', status: 'Xóa thành công' });
    }).catch(error => {
        res.json({ success: false, error: 'Có lỗi xảy ra với CSDL' });
    });
});

module.exports = route;