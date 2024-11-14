const getErrorKey = (response) => {
    let errorKey;

    if ( response instanceof Error) {
        const errorData = JSON.parse(response.message);
        errorKey = errorData.error.details?.key;
    } else {
        errorKey = response.details?.key;
    }

    return errorKey;
};

export default getErrorKey;