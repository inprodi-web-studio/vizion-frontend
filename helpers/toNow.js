import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend( relativeTime );

const toNow = (date) => {
    return dayjs(date).locale( "es-mx" ).toNow(true);
};

export default toNow;