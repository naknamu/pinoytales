const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return `/authors/${this.slug}`;
});

AuthorSchema.pre("save", async function (next) {
  const author = this;
  try {
    const slug = slugify(author.name, { lower: true, strict: true });
    author.slug = slug;
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

AuthorSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    // Handle unique constraint violation error
    next(new Error("Slug must be unique"));
  } else {
    next(error);
  }
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
