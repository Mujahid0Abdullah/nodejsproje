const mongoose = require("mongoose");
const Schema = mongoose.Schema
const articleShema = new Schema({
    Title: String,
    body: String,
    numberOfLikes: Number,
    yazar: String,
    tarih: Date

})

const FinalArticle = mongoose.model("Article", articleShema);

module.exports = FinalArticle;