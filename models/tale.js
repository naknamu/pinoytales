const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const TaleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    genre: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      }
    ],
    banner_url: {
        type: String,
        required: true
    }
    },
    { timestamps: true }
);

// Virtual for author's URL
TaleSchema.virtual("url").get(function () {
    
    return `/tales/${this.slug}`;
});

TaleSchema.pre('save', async function (next) {
  const tale = this;
  try {
    const slug = slugify(tale.title, { lower: true, strict: true });
    tale.slug = slug;
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

TaleSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    // Handle unique constraint violation error
    next(new Error('Slug must be unique'));
  } else {
    next(error);
  }
});


// Export model
module.exports = mongoose.model("Tale", TaleSchema);