const pagingOptions = (query) => {
  let { page, limit, sort, order } = query;

  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;

  if (sort) {
    sort = sort;
  }

  if (sort && order && order === "desc") {
    sort = `-${sort}`;
  }

  return { page, limit, sort, order };
};

module.exports = { pagingOptions };
