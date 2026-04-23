const buildMatch = (filters) => {
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

  return match;
};

export default buildMatch;
