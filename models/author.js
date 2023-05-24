const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});


// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
    const urlRegex = /\s/g;
    const url_title = this.name.toLowerCase().replace(urlRegex, '-');

    return `/authors/${url_title}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);