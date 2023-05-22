const asyncHandler = require('express-async-handler');
const Tale = require('../models/tale');
const Author = require('../models/author');
const Genre = require('../models/genre');

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
    // Get details of published blog posts, categories and tags (in parallel)
    const [
        taleCount, 
        genreCount, 
        authorCount
    ] = await Promise.all([
        Tale.countDocuments().exec(),
        Genre.countDocuments().exec(),
        Author.countDocuments().exec(),
    ]);

    res.render("home", {
        title: "Home",        
        tale_count: taleCount,
        genre_count: genreCount,
        author_count: authorCount
    })
});

module.exports = { home };