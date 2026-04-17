import User from "../model/user.js";
import { getAge, getGender, getNation } from "../service/index.js";
import { processData } from "../utils/processData.js";
import { v7 as uuidv7 } from "uuid";

const saveUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || String(name).trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Missing or empty name parameter",
      });
    }

    if (Array.isArray(name) || typeof name !== "string") {
      return res.status(422).json({
        status: "error",
        message: "Invalid type for name",
      });
    }

    const cleanName = name.trim().toLowerCase();

    // ✅ Idempotency
    const existingUser = await User.findOne({ name: cleanName }).select(
      "-_id -__v",
    );
    if (existingUser) {
      return res.status(200).json({
        status: "success",
        message: "Profile already exists",
        data: existingUser,
      });
    }

    const genderData = await getGender(cleanName);
    const ageData = await getAge(cleanName);
    const nationData = await getNation(cleanName);

    let processedData = processData(genderData, ageData, nationData);

    if (processedData.error) {
      return res.status(502).json({
        status: "error",
        message: processedData.error,
      });
    }

    processedData.id = uuidv7();
    processedData.name = cleanName;
    processedData.created_at = new Date().toISOString();

    const user = await User.create(processedData);

    const userObj = user.toObject();
    delete userObj._id;
    delete userObj.__v;

    return res.status(201).json({
      status: "success",
      data: userObj,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await User.findOne({ id: id }).select("-__v  -_id");
    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const { gender, country_id, age_group } = req.query;

    const filter = {};
    if (gender) {
      filter.gender = gender.toLowerCase();
    }
    if (country_id) {
      filter.country_id = country_id.toLowerCase();
    }
    if (age_group) {
      filter.age_group = age_group.toLowerCase();
    }

    const profiles = await User.find(filter)
      .select("id name gender age age_group country_id -_id")
      .sort({ name: 1 })
      .collation({ locale: "en", strength: 2 });

    return res
      .status(200)
      .json({ status: "success", count: profiles.length, data: profiles });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await User.findOne({ id });

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    await User.findOneAndDelete({ id });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
export { saveUser, getProfile, getProfiles, deleteProfile };
