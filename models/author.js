const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {
        type: String
    },
    family_name: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date
    }
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name, this.first_name}`;
    }

    return fullname;
})

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
    return `/author/${this.first_name-this.family_name}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);