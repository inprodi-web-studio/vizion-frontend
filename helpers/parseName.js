const parseName = ({ name, middleName, lastName }) => {
    return `${name}${middleName ? ` ${middleName}` : ""}${lastName ? ` ${lastName}` : ""}`
};

export default parseName;