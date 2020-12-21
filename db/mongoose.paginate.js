/**
 * Paging helper
 * @param {Object} [query={}]
 * @param {Object} [options={}]
 * @param {Object|String} [options.select] - Fields to return (by default returns all fields)
 * @param {Object|String} [options.sort] - Sort order
 * @param {Array|Object|String} [options.populate] - Paths which should be populated with other documents
 * @param {Number} [options.offset=0] - Use offset or page to set skip position
 * @param {Number} [options.page=1]
 * @param {Number} [options.limit=10]
 * @param {Function} [callback]
 * @returns {Promise}
 */

const defaultOptions = {
  page: 1,
  limit: 10,
};

function paginate(query, options, callback) {
  query = query || {};
  options = Object.assign({}, defaultOptions, options);

  const select = options.select;
  const sort = options.sort;
  const populate = options.populate;
  const limit = options.limit ? options.limit : defaultOptions.limit;

  let page, offset, skip;
  let promises = [];

  if (options.offset) {
    offset = options.offset;
    skip = offset;
  } else if (options.page) {
    page = options.page;
    skip = (page - 1) * limit;
  } else {
    page = 1;
    offset = 0;
    skip = offset;
  }

  // Document count promise
  const documentCountPromise = this.estimatedDocumentCount(query).exec();
  promises.push(documentCountPromise);

  // Documents promise
  if (limit) {
    let docsQuery = this.find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (populate) {
      [].concat(populate).forEach((item) => {
        docsQuery.populate(item);
      });
    }

    const docsPromise = docsQuery.exec();
    promises.push(docsPromise);
  }

  return Promise.all(promises).then((values) => {
    const [total, docs] = values;

    let result = {
      docs: docs,
      total: total,
      limit: limit,
    };

    if (offset !== undefined) {
      result.offset = offset;
    }

    if (page !== undefined) {
      const totalPages = Math.ceil(total / limit) || 1;

      result.page = page;
      result.totalPages = totalPages;
      result.hasNextPage = page < totalPages;
      result.hasPreviousPage = page > 1;
    }

    if (typeof callback === "function") {
      return callback(null, result);
    }

    return Promise.resolve(result);
  });
}

module.exports = function (schema) {
  schema.statics.paginate = paginate;
};
