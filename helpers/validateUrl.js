const validateUrl = (url) => {
    const regex = /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]*)?$/;
    return regex.test(url);
}

export default validateUrl;
