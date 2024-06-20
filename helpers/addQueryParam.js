const addQueryParam = ( key, value) => {
    const url = new URL(window.location);
    
    url.searchParams.set(key, value);
    window.history.pushState({}, "", url);
};

export default addQueryParam;