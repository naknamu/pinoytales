const Tale = require("../models/tale");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Tale
tale_list = asyncHandler(async (req, res, next) => {
  const results = await Tale.find({}, "title slug").exec();

  res.status(200).json(results);
});

// Display detail page for a specific Tale.
tale_detail = asyncHandler(async (req, res, next) => {
  const results = await Tale.findOne({ slug: req.params.taletitle })
    .populate("genre author")
    .exec();

  res.status(200).json(results);
});

// Display Tale create form on GET.
tale_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Tale create GET");
});

// Handle Tale create on POST.
tale_create_post = [
  // Convert genre to an array
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }

    next();
  },
  // Convert banner_url to an array
  (req, res, next) => {
    if (!(req.body.banner_url instanceof Array)) {
      if (typeof req.body.banner_url === "undefined") req.body.banner_url = [];
      else req.body.banner_url = new Array(req.body.banner_url);
    }

    next();
  },

  // Validate and sanitize fields.

  body("title", "Title must not be empty.").trim().isLength({ min: 1 }),
  body("author", "Author must not be empty.").trim().isLength({ min: 1 }),
  body("content", "Content must not be empty").trim().isLength({ min: 1 }),
  body("genre", "Genre must not be empty").trim().isLength({ min: 1 }),
  body("banner_url", "Banner url must not be empty")
    .trim()
    .isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const tale = new Tale({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      genre: req.body.genre,
      banner_url: req.body.banner_url,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      await tale.save();
      res.status(200).json({ message: `Successfully saved ${req.body.title}` });
    }
  }),
];

// Display Tale delete form on GET.
tale_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Tale delete GET: ${req.params.taletitle} `);
});

// Handle Tale delete on POST.
tale_delete_post = asyncHandler(async (req, res, next) => {
  const tale = await Tale.findByIdAndDelete(req.params.taleid);

  res.status(200).json({ message: `Deleted Tale: ${tale.title}` });
});

// Display Tale update form on GET.
tale_update_get = asyncHandler(async (req, res, next) => {
  const tale = await Tale.findById(req.params.taleid);

  res.status(200).json(tale);
});

// Handle Tale update on POST.
tale_update_post = [
  // Convert genre to an array
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }

    next();
  },

  // Validate and sanitize fields.

  body("title", "Title must not be empty.").trim().isLength({ min: 1 }),
  body("author", "Author must not be empty.").trim().isLength({ min: 1 }),
  body("content", "Content must not be empty").trim().isLength({ min: 1 }),
  body("genre", "Genre must not be empty").trim().isLength({ min: 1 }),
  body("banner_url", "Banner url must not be empty")
    .trim()
    .isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const tale = new Tale({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      genre: req.body.genre,
      banner_url: req.body.banner_url,
      _id: req.params.taleid,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      const updatedTale = await Tale.findByIdAndUpdate(
        req.params.taleid,
        tale,
        {
          new: true, // to return the updated document
          runValidators: true, // to ensure that any validation rules are applied.
          context: "query", //  to ensure that the pre-save middleware is triggered
        }
      );

      // Wait for the update to complete
      await updatedTale.save();

      res
        .status(200)
        .json({ message: `Successfully updated ${updatedTale.title}` });
    }
  }),
];

module.exports = {
  tale_list,
  tale_detail,
  tale_create_get,
  tale_create_post,
  tale_delete_get,
  tale_delete_post,
  tale_update_get,
  tale_update_post,
};
