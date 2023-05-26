const Genre = require("../models/genre");
const Tale = require("../models/tale");
const asyncHandler = require("express-async-handler");

// Display list of all genres
genre_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre LIST");
});

// Display detail page for a specific genre.
genre_detail = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findOne({ slug: req.params.genrename }).exec();

  const tale_list = await Tale.find({ genre: genre.id }).exec();

  res.render("genre_detail", {
    title: `${genre.name}`,
    genre,
    tale_list,
  });
});

// Display genre create form on GET.
genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre create GET");
});

// Handle genre create form on POST.
genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre create POST");
});

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
  genre_update_post,
};
