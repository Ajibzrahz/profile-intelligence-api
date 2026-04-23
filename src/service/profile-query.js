const runProfileQuery = async ({
  User,
  filters,
  sort_by,
  order,
  page,
  limit,
}) => {
  const match = {};

  if (filters.gender) match.gender = filters.gender;
  if (filters.country_id) match.country_id = filters.country_id;
  if (filters.age_group) match.age_group = filters.age_group;

  if (filters.min_age || filters.max_age) {
    match.age = {};
    if (filters.min_age) match.age.$gte = filters.min_age;
    if (filters.max_age) match.age.$lte = filters.max_age;
  }

  if (filters.min_gender_probability) {
    match.gender_probability = {
      $gte: filters.min_gender_probability,
    };
  }

  if (filters.min_country_probability) {
    match.country_probability = {
      $gte: filters.min_country_probability,
    };
  }

  let sortStage = null;

  if (sort_by) {
    if (
      sort_by !== "age" &&
      sort_by !== "created_at" &&
      sort_by !== "gender_probability"
    ) {
      throw new Error("INVALID_QUERY");
    }

    if (order && order !== "asc" && order !== "desc") {
      throw new Error("INVALID_QUERY");
    }

    sortStage = {};
    sortStage[sort_by] = order === "desc" ? -1 : 1;
  }


  const pageValue = parseInt(page) || 1;
  const limitValue = Math.min(parseInt(limit) || 10, 50);
  const skip = (pageValue - 1) * limitValue;


  const total = await User.countDocuments(match);


  const pipeline = [
    { $match: match },
    ...(sortStage ? [{ $sort: sortStage }] : []),
    { $skip: skip },
    { $limit: limitValue },
    {
      $project: {
        _id: 0,
        id: 1,
        name: 1,
        gender: 1,
        gender_probability: 1,
        age: 1,
        age_group: 1,
        country_id: 1,
        country_name: 1,
        country_probability: 1,
        created_at: 1,
      },
    },
  ];

  const data = await User.aggregate(pipeline);

  return {
    data,
    page: pageValue,
    limit: limitValue,
    total,
  };
};

export default runProfileQuery;
