import React from "react";

const LoadingScreen = () => {

    return (
        <div style={{ width : "100vw", height : "100vh", display : "flex", justifyContent : "center", alignItems : "center" }}>
            <span className="loader"></span>
        </div>
    );
};

export default LoadingScreen;