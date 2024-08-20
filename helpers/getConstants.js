const getConstants = () => {
    return {
        API_URL : process.env.NODE_ENV === "development" ? "https://vizion-api-t8wzz.ondigitalocean.app/api" : "https://vizion-api-t8wzz.ondigitalocean.app/api",
        // API_URL : process.env.NODE_ENV === "development" ? "https://mayfly-intimate-polliwog.ngrok-free.app/api" : "https://vizion-api-t8wzz.ondigitalocean.app/api",
    };
};

export default getConstants;