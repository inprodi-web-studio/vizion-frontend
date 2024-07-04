import qs from "qs";

const getQueryParamsObject = () => {
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const params = qs.parse(queryString, { ignoreQueryPrefix: true });

    if ( Object.keys(params).length === 0 && params.constructor === Object ) return null;
    
    return params;
  }
  return null;
};

export default getQueryParamsObject;