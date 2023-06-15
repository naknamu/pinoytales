const asyncHandler = require("express-async-handler");
const Tale = require("../models/tale");
const Author = require("../models/author");
const Genre = require("../models/genre");

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
  // Get details of latest tales, author and genre (in parallel)
  const [latestTales, genreList, authorList] = await Promise.all([
    Tale.find({}).limit(10).sort({ createdAt: -1 }).populate("genre").exec(),
    Genre.find({}).sort({ name: 1 }).exec(),
    Author.find({}).sort({ name: 1 }).exec(),
  ]);

  res.render("home", {
    title: "Home",
    latest_tales: latestTales,
    genre_list: genreList,
    author_list: authorList,
  });
});

module.exports = { home };
