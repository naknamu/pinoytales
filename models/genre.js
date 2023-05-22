const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

// Virtual for author's URL
GenreSchema.virtual("url").get(function () {
    const urlRegex = /\s/g;
    const url_title = this.name.toLowerCase().replace(urlRegex, '-');

    return `/genre/${url_title}`;
});

// Export model
module.exports = mongoose.model("Genre", GenreSchema);