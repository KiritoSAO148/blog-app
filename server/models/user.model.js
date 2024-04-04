import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com.vn/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw1UkTSZCFG_22sEiizuSezJ&ust=1712291158870000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMie8fnbp4UDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
