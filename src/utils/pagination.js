const getPagination = (page, limit) => {
  const pageValue = parseInt(page) || 1;
  const limitValue = Math.min(parseInt(limit) || 10, 50);

  const skip = (pageValue - 1) * limitValue;

  return {
    pageValue,
    limitValue,
    skip,
  };
};

export default getPagination;
