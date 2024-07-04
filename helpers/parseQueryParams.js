import qs from "qs";

const parseQueryParams = (params) => {
  const queryString = qs.stringify(params, { encodeValuesOnly: true });

  return queryString;
};

export default parseQueryParams;
