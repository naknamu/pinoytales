const Author = require('../models/author');
const Tale = require('../models/tale');
const asyncHandler = require('express-async-handler')

// Display list of all authors
author_list = asyncHandler( async(req, res, next) => {
    res.send("NOT IMPLEMENTED: author LIST")
})

// Display detail page for a specific author.
author_detail = asyncHandler(async (req, res, next) => {
    const author = await Author.findOne({ slug: req.params.authorname}).exec();

    const tale_list = await Tale.find({ author: author.id}).exec();

    res.render("author_detail", {
        title: `${author.name}`,
        author,
        tale_list
    });
});

// Display author create form on GET.
author_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: author create GET");
});

// Handle author create form on POST.
author_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: author create POST");
});

// Display author delete form on GET.
author_delete_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: author delete GET: ${req.params.authorname} `);
});

// Handle author delete on POST.
author_delete_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: author delete POST: ${req.params.authorname}`);
});

// Display author update form on GET.
author_update_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: author update GET: ${req.params.authorname}`);
});

// Handle author update on POST.
author_update_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: author update POST: ${req.params.authorname}`);
});

module.exports = {
    author_list,
    author_detail,
    author_create_get,
    author_create_post,
    author_delete_get,
    author_delete_post,
    author_update_get,
    author_update_post
}