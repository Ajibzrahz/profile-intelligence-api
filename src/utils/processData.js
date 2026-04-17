const processData = (genderData, ageData, nationData) => {
  const {
    name,
    gender,
    probability: gender_probability,
    count,
  } = genderData;

  const { age } = ageData;
  const countries = nationData.country;

  if (gender === null || count === 0) {
    return {
      error: "Genderize returned an invalid response",
    };
  }

  if (age === null) {
    return {
      error: "Agify returned an invalid response",
    };
  }

  if (!countries || countries.length === 0) {
    return {
      error: "Nationalize returned an invalid response",
    };
  }

  const topCountry = countries.reduce((highest, current) =>
    current.probability > highest.probability ? current : highest
  );

  let age_group = "";

  if (age <= 12) {
    age_group = "child";
  } else if (age <= 19) {
    age_group = "teenager";
  } else if (age <= 59) {
    age_group = "adult";
  } else {
    age_group = "senior";
  }

  return {
    name,
    gender,
    gender_probability,
    sample_size: count,
    age,
    age_group,
    country_id: topCountry.country_id,
    country_probability: topCountry.probability,
  };
};

export { processData };