const router = require('express').Router();
const Blog = require('../models/Blog')

router.get('/blog', async (req, res) => {
try {
const page = parseInt(req.query.page) || 1;
const search = req.query.search || '';
const limit = 5;
const skip = (page - 1) * limit;
const regex = new RegExp(search, 'i');
const count = await Blog.countDocuments({ topic: regex });
const blogs = await Blog.find({ topic: regex })
.skip(skip)
.limit(limit)
.sort({ posted_at: 'desc' });
res.json({
status: 'success',
result: blogs,
page: page,
total_pages: Math.ceil(count / limit),
total_results: count,
});
} catch (error) {
res.status(500).json({ message: error.message });
}
});

router.post('/blog', async (req, res) => {
const { topic, description, posted_at, posted_by } = req.body;
const blog = new Blog({
topic,
description,
posted_at,
posted_by,
});
try {
const savedBlog = await blog.save();
res.json({
status: 'success',
result: savedBlog,
});
} catch (error) {
res.status(400).json({ message: error.message });
}
});

router.put('/blog/:id', async (req, res) => {
const { id } = req.params;
const { topic, description, posted_at, posted_by } = req.body;
try {
const blog = await Blog.findByIdAndUpdate(
id,
{
topic,
description,
posted_at,
posted_by,
},
{ new: true }
);
res.json({
status: 'success',
result: blog,
});
} catch (error) {
res.status(400).json({ message: error.message });
}
});

router.delete('/blog/:id', async (req, res) => {
const { id } = req.params;
try {
const blog = await Blog.findByIdAndDelete(id);
res.json({
status: 'success',
result: blog,
});
} catch (error) {
res.status(400).json({ message: error.message });
}
});

module.exports = router;