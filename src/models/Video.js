import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String}],
    meta: {
        views: Number,
        rating: Number,
    },
});

const movie = mongoose.model("Video", videoSchema);
export default movie;