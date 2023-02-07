const searchParamsToRegexQuery = (searchParams) =>
  Object.keys(searchParams).reduce((acc, key) => {
    acc[key] = new RegExp(searchParams[key], 'i');
    return acc;
  }, {});

module.exports = { searchParamsToRegexQuery };
