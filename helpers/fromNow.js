import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend( relativeTime );

const fromNow = (date) => {
    return dayjs(date).locale( "es-mx" ).fromNow(true);
};

export default fromNow;