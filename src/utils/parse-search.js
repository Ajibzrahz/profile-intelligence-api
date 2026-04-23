const parseSearch = (query) => {
  const filters = {};
  const search = query.toLowerCase();

  // -------- GENDER --------
  const hasFemale = search.includes("female") || search.includes("females");
  const hasMale = search.includes("male") || search.includes("males");

  if (hasFemale && !hasMale) filters.gender = "female";
  else if (hasMale && !hasFemale) filters.gender = "male";

  // -------- AGE GROUP --------
  if (search.includes("adult")) filters.age_group = "adult";
  if (search.includes("teenager")) filters.age_group = "teenager";
  if (search.includes("senior")) filters.age_group = "senior";
  if (search.includes("child") || search.includes("children"))
    filters.age_group = "child";

  // -------- YOUNG --------
  if (search.includes("young")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  // -------- AGE NUMBERS --------
  const aboveMatch = search.match(/above (\d+)/);
  if (aboveMatch) filters.min_age = Number(aboveMatch[1]);

  const belowMatch = search.match(/below (\d+)/);
  if (belowMatch) filters.max_age = Number(belowMatch[1]);

  // -------- COUNTRY --------
  const countries = {
    nigeria: "NG",
    kenya: "KE",
    angola: "AO",
    ghana: "GH",
  };

  for (const country in countries) {
    if (search.includes(country)) {
      filters.country_id = countries[country];
      break;
    }
  }

  return filters;
};

export default parseSearch;
