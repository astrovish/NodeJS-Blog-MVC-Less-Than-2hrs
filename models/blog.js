const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of a blog",
        trim: true,
        type: String,
        required: true
    },
    body: {
        desc: "Detail of a blog",
        trim: true,
        type: String,
        required: true
    },
    userId: {
        desc: "Id of a user who creates the blog",
        type: Number,
        default: 34
    },
    slug: {
        desc: "SEO friendly url",
        type: String,
        required: true,
        unique: true
    }
});

blogSchema.pre("validate", function(next) {
    if(this.title){
        this.slug = slugify(this.title, {
            lower: true, 
            strict: true
        })
    }

    next();
})

module.exports = mongoose.model("Blog", blogSchema);