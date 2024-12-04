const RackItem = ({
    partitions = 5,
    isFocused = false,
    focusedPartition,
} ) => {
    const itemContainer = {
        width : "100px",
        height : "100px",
        position : "relative",
        padding : "7px 6px 5px",
        display : "flex",
        gap : "2px",
    };

    const innerContainer = {
        width : "100%",
        height : "100%",
        borderRadius : "6px",
        backgroundColor : "#CED4DA",
        boxShadow : "inset 0 0 20px #0000000d,inset 0 0 8px #0000004d",
    };

    return (
        <div style={itemContainer}>
            <div
                className="left"
                style={{
                    background : "#373737",
                    width : "4px",
                    height : "100%",
                    bottom : 0,
                    left : -2,
                    position : "absolute"
                }}
            />
            <div
                className="right"
                style={{
                    background : "#373737",
                    width : "100%",
                    height : "4px",
                    top : 0,
                    left : 0,
                    position : "absolute"
                }}
            />
            <div
                className="top"
                style={{
                    background : "#373737",
                    width : "4px",
                    height : "100%",
                    bottom : 0,
                    right : -2,
                    position : "absolute"
                }}
            />

            { Array.from({length : partitions}).map( (_, index) => (
                <div style={{
                    ...innerContainer,
                    backgroundColor : (index === focusedPartition && isFocused) ? "var(--antd-colorPrimary)" : "#CED4DA",
                }} key={index}>

                </div>
            ))}
        </div>
    );
};

export default RackItem;