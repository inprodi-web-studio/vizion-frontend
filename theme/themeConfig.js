const theme = (isDarkMode) => {

    return {
        token: {
            fontFamily: "Geist Sans",
            colorSplit : isDarkMode ? "#424242" : "#CED4DA",
            // colorTextSecondary: "#868E96",
            // colorBorder : "#CED4DA",
            // colorBorderSecondary: "#CED4DA",
        },
    }
};

export default theme;