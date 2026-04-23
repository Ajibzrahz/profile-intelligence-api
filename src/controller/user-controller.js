import User from "../model/user.js";
import runProfileQuery from '../service/profile-query.js'
import {getPagination, parseSearch, buildMatch, buildSort} from "../utils/index.js"

const getProfiles = async (req, res) => {
  try {
    const {
      gender,
      country_id,
      age_group,
      min_age,
      max_age,
      min_gender_probability,
      min_country_probability,
      sort_by,
      order,
      page,
      limit,
    } = req.query;

    const filters = {
      gender: gender?.toLowerCase(),
      country_id: country_id?.toUpperCase(),
      age_group: age_group?.toLowerCase(),
      min_age: min_age ? Number(min_age) : undefined,
      max_age: max_age ? Number(max_age) : undefined,
      min_gender_probability: min_gender_probability
        ? Number(min_gender_probability)
        : undefined,
      min_country_probability: min_country_probability
        ? Number(min_country_probability)
        : undefined,
    };

    const result = await runProfileQuery({
      User,
      filters,
      sort_by,
      order,
      page,
      limit,
    });

    return res.status(200).json({
      status: "success",
      page: result.page,
      limit: result.limit,
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    if (error.message === "INVALID_QUERY") {
      return res.status(422).json({
        status: "error",
        message: "Invalid query parameters",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const searchProfiles = async (req, res) => {
  try {
    const { q, sort_by, order, page, limit } = req.query;

    if (!q) {
      return res.status(400).json({
        status: "error",
        message: "Missing search query",
      });
    }

    const filters = parseSearch(q);

    if (Object.keys(filters).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Unable to interpret query",
      });
    }

    const result = await runProfileQuery({
      User,
      filters,
      sort_by,
      order,
      page,
      limit,
    });

    return res.status(200).json({
      status: "success",
      page: result.page,
      limit: result.limit,
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    if (error.message === "INVALID_QUERY") {
      return res.status(422).json({
        status: "error",
        message: "Invalid query parameters",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

export {  getProfiles, searchProfiles };
