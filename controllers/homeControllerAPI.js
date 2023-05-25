const asyncHandler = require('express-async-handler');
const Tale = require('../models/tale');
const Author = require('../models/author');
const Genre = require('../models/genre');

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
    // Get details of published blog posts, categories and tags (in parallel)
    const [
        tale_count, 
        genre_count, 
        author_count
    ] = await Promise.all([
        Tale.countDocuments().exec(),
        Genre.countDocuments().exec(),
        Author.countDocuments().exec(),
    ]);

    const data = {
        tale_count,
        genre_count,
        author_count
    }

    res.status(200).json(data);
});

module.exports = { home };