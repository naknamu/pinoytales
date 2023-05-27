const Author = require("../models/author");
const Tale = require("../models/tale");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all authors
author_list = asyncHandler(async (req, res, next) => {
  const author_list = await Author.find({}, "name slug").exec();

  res.status(200).json(author_list);
});

// Display detail page for a specific author.
author_detail = asyncHandler(async (req, res, next) => {
  const author = await Author.findOne({ slug: req.params.authorname }).exec();

  const tale_list = await Tale.find({ author: author.id }).exec();

  res.status(200).json({ author, tale_list });
});

// Display author create form on GET.
author_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: author create GET");
});

// Handle author create form on POST.
author_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic."),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Author object with trimmed data.
    const author = new Author({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      await author.save();
      res
        .status(200)
        .json({ message: `Successfully saved author: ${req.body.name}` });
    }
  }),
];

// Display author delete form on GET.
author_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: author delete GET: ${req.params.authorname} `);
});

// Handle author delete on POST.
author_delete_post = asyncHandler(async (req, res, next) => {
  const author = await Author.findByIdAndRemove(req.params.authorid);

  res.status(200).json({ message: `Deleted author: ${author.name}` });
});

// Display author update form on GET.
author_update_get = asyncHandler(async (req, res, next) => {
  const author = await Author.findById(req.params.authorid).exec();

  res.status(200).json(author);
});

// Handle author update on POST.
author_update_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic."),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Author object with trimmed data.
    const author = new Author({
      name: req.body.name,
      _id: req.params.authorid,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      const updatedAuthor = await Author.findByIdAndUpdate(
        req.params.authorid,
        author,
        {
          new: true, // to return the updated document
          runValidators: true, // to ensure that any validation rules are applied.
          context: "query", //  to ensure that the pre-save middleware is triggered
        }
      );

      // Wait for the update to complete
      await updatedAuthor.save();

      res
        .status(200)
        .json({ message: `Successfully updated ${updatedAuthor.name}` });
    }
  }),
];

module.exports = {
  author_list,
  author_detail,
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post,
};
