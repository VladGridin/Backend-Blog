import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // Обязательно
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    // Не обязательно
    avatarUrl: String,
}, 
{
    timestamps: true,
},
);

export default mongoose.model('User', UserSchema);