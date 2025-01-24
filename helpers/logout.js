import Router from "next/router";
import Cookies from "js-cookie";

const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    localStorage.removeItem("currentApp");
    localStorage.removeItem("primaryColor");
    localStorage.removeItem("tableFields");
    localStorage.removeItem("app");

    const storedUser = Cookies.get("user");

    if (!storedUser) {
        Router.push("/auth/login");
        return;
    }

    const parsedUser = JSON.parse(storedUser);

    const urlParam = parsedUser?.company?.urlParam;

    if ( urlParam ) {
        Router.push(`/${urlParam}/auth/login`);
    } else {
        Router.push("/auth/login");
    }
};

export default logout;