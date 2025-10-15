function createFilterBuilder() {
  const filters = [];
  const values = [];

  function addEquality(column, value) {
    values.push(value);
    filters.push(`${column} = $${values.length}`);
  }

  function buildWhereClause() {
    return filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  }

  function buildValues(...extraValues) {
    return [...values, ...extraValues];
  }

  return {
    addEquality,
    buildValues,
    buildWhereClause,
    values,
  };
}

module.exports = {
  createFilterBuilder,
};
