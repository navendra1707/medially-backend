import mongoose from "mongoose";

const UserIdSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }
});

const UserId = mongoose.model("UserId", UserIdSchema);
export default UserId;