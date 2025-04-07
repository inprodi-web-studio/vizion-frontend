import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es-mx";

dayjs.extend(localizedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

const createDayJsObject = (date, tz = null) => {
    const userTimezone = tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (date) {
        return dayjs(date).tz(userTimezone).locale("es-mx");
    }

    return dayjs().tz(userTimezone).locale("es-mx");
}

export default createDayJsObject;