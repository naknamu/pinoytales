const asyncHandler = require('express-async-handler');
const Tale = require('../models/tale');
const Author = require('../models/author');
const Genre = require('../models/genre');

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
    // Get details of published blog posts, categories and tags (in parallel)
    const [
        latestTales, 
        genreList, 
        authorList
    ] = await Promise.all([
        Tale.find({}).limit(2).sort({createdAt: -1}).exec(),
        Genre.find({}).sort({"name": 1}).exec(),
        Author.find({}).sort({"name": 1}).exec(),
    ]);

    res.render("home", {
        title: "Home",        
        latest_tales: latestTales,
        genre_list: genreList,
        author_list: authorList
    })
});

module.exports = { home };