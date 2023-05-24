const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaleSchema = new Schema({
    title: {
        type: String,
        required: true
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
    genre: {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
    },
    banner_url: {
        type: String,
        required: true
    }
    },
    { timestamps: true }
);

// Virtual for author's URL
TaleSchema.virtual("url").get(function () {
    const urlRegex = /\s/g;
    const url_title = this.title.toLowerCase().replace(urlRegex, '-');

    return `/tales/${url_title}`;
});

// Export model
module.exports = mongoose.model("Tale", TaleSchema);