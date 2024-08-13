const formatShortNumber = (number, isCurrency = false) => {
    let formattedNumber;

    if (number < 1000) {
        formattedNumber = number.toString();
    } else if (number >= 1000 && number < 1000000) {
        formattedNumber = (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (number >= 1000000 && number < 1000000000) {
        formattedNumber = (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (number >= 1000000000 && number < 1000000000000) {
        formattedNumber = (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else {
        formattedNumber = (number / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
    }

    if (isCurrency) {
        formattedNumber = `$${formattedNumber}`;
    }

    return formattedNumber;
}

export default formatShortNumber;