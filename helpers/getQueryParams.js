import qs from "qs";

const getQueryParams = () => {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return qs.stringify(params, { addQueryPrefix: true, encode: false });
  }
  return "";
};

export default getQueryParams;