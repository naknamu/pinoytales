const asyncHandler = require('express-async-handler');
const Tale = require('../models/tale');
const Author = require('../models/author');
const Genre = require('../models/genre');
const User = require('../models/user');

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
    // Get details of published tales, authors and genre (in parallel)
    const [
        tale_count, 
        genre_count, 
        author_count,
        user_count
    ] = await Promise.all([
        Tale.countDocuments().exec(),
        Genre.countDocuments().exec(),
        Author.countDocuments().exec(),
        User.countDocuments().exec()
    ]);

    const data = {
        tale_count,
        genre_count,
        author_count,
        user_count
    }

    res.status(200).json(data);
});

module.exports = { home };