const Genre = require('../models/genre');
const Tale = require('../models/tale');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

// Display list of all genres
genre_list = asyncHandler( async(req, res, next) => {
    const genre_list = await Genre.find({}, "name").exec();

    res.status(200).json(genre_list);
})

// Display detail page for a specific genre.
genre_detail = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findOne({ slug: req.params.genrename}).exec();

    const tale_list = await Tale.find({ genre: genre.id}, "title").exec();

    res.status(200).json({genre, tale_list})
});

// Display genre create form on GET.
genre_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre create GET");
});

// Handle genre create form on POST.
genre_create_post = [
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
  
      // Create a Genre object with trimmed data.
      const genre = new Genre({
        name: req.body.name,
      });
  
      if (!errors.isEmpty()) {
        res.status(400).json(errors.mapped());
      } else {
        await genre.save();
        res
          .status(200)
          .json({ message: `Successfully saved genre: ${req.body.name}` });
      }
    }),
  ];

// Display genre delete form on GET.
genre_delete_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: genre delete GET: ${req.params.genrename} `);
});

// Handle genre delete on POST.
genre_delete_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: genre delete POST: ${req.params.genrename}`);
});

// Display genre update form on GET.
genre_update_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: genre update GET: ${req.params.genrename}`);
});

// Handle genre update on POST.
genre_update_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: genre update POST: ${req.params.genrename}`);
});

module.exports = {
    genre_list,
    genre_detail,
    genre_create_get,
    genre_create_post,
    genre_delete_get,
    genre_delete_post,
    genre_update_get,
    genre_update_post
}