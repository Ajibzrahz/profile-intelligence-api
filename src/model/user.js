import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  gender_probability: Number,
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
    validate: {
      validator: function (v) {
        return v.length === 2; // Exact length check
      },
      message: (props) =>
        `${props.value} is not a valid code. Code must be exactly 2 characters.`,
    },
  },
  country_name: {
    type: String,
    required: true,
  },
  country_probability: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
