const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
{
topic: { type: String, required: true },
description: { type: String, required: true },
posted_at: { type: Date, required: true },
posted_by: { type: String, required: true },
},
{ timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;