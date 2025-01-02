import Router from "next/router";

const logout = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentApp");
    localStorage.removeItem("fields");

    if ( storedUser?.company?.urlParam ) {
        Router.push(`/${urlParam}/auth/login`);
    } else {
        Router.push("/auth/login");
    }
};

export default logout;