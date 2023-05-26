const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
    },
});

// Virtual for author's URL
GenreSchema.virtual("url").get(function () {

    return `/genres/${this.slug}`;
});

GenreSchema.pre('save', async function (next) {
    const genre = this;
    try {
      const slug = slugify(genre.name, { lower: true, strict: true });
      genre.slug = slug;
      next();
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
});
  
GenreSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        // Handle unique constraint violation error
        next(new Error('Slug must be unique'));
    } else {
        next(error);
    }
});

// Export model
module.exports = mongoose.model("Genre", GenreSchema);