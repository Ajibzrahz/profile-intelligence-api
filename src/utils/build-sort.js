const buildSort = (sort_by, order) => {
  if (!sort_by) return null;

  const allowedFields = ["age", "created_at", "gender_probability"];

  if (!allowedFields.includes(sort_by)) {
    throw new Error("INVALID_QUERY");
  }

  if (order && order !== "asc" && order !== "desc") {
    throw new Error("INVALID_QUERY");
  }

  const sort = {};
  sort[sort_by] = order === "desc" ? -1 : 1;

  return sort;
};

export default buildSort;
