const Tale = require("../model/tale");
const asyncHandler = require('express-async-handler')

// Display list of all Tale
tale_list = asyncHandler( async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Tale LIST")
})

// Display detail page for a specific Tale.
tale_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Tale detail: ${req.params.id}`);
});

// Display Tale create form on GET.
tale_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Tale create GET");
});

// Handle Tale create on POST.
tale_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Tale create POST");
});

// Display Tale delete form on GET.
tale_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Tale delete GET");
});

// Handle Tale delete on POST.
tale_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Tale delete POST");
});

// Display Tale update form on GET.
tale_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Tale update GET");
});

// Handle Tale update on POST.
tale_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Tale update POST");
});

module.exports = {
    tale_list,
    tale_detail,
    tale_create_get,
    tale_create_post,
    tale_delete_get,
    tale_delete_post,
    tale_update_get,
    tale_update_post
}