import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    gender_probability: Number,
    sample_size: Number,
    age: {
      type: Number,
      required: true,
    },
    age_group: {
      type: String,
      required: true,
    },
    country_id: {
      type: String,
      required: true,
    },
    country_probability: Number,
    created_at: {
        type: Date
    }
  },
);

const User = mongoose.model("User", userSchema);
export default User;
