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
    return `/author/${this.name}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);