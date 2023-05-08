import mongoose from "mongoose";

const PostShema = new mongoose.Schema({
    // Обязательный тип 
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Не обязательно
    imageUrl: String,
}, 
{
    timestamps: true,
},
);

export default mongoose.model('Post', PostShema);