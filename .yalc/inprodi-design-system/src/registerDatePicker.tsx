import React from "react";
import registerComponent, {
    CodeComponentMeta,
} from "@plasmicapp/host/registerComponent";
import { DatePicker as AntdDatePicker } from "antd";
import type { DatePickerProps as AntdDatePickerProps } from "antd/es/date-picker";
import { Registerable } from "./registerable";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

import "dayjs/locale/es-mx";

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

dayjs.locale("es-mx");

interface DatePickerProps extends AntdDatePickerProps {
    error?: string | null | undefined;
    value: any;
    onChange : any;
    disabledDates?: string[];
}

export const DatePicker = ({
    size,
    error,
    showTime,
    value,
    minDate,
    maxDate,
    disabledDates,
    onChange,
    ...props
} : DatePickerProps ) => {
    const disabledDate = (current: any) => {
        if (!disabledDates) return false;
        return disabledDates.some(date => dayjs(date).isSame(current, 'day'));
    };

    return (
        <AntdDatePicker
            {...props}
            style={{
                height: size === "small" ? "30px" : size === "middle" ? "38px" : "46px",
            }}
            showNow={false}
            showTime={showTime}
            format={ showTime ? "MMMM D, YYYY - HH:mm" : "MMMM D, YYYY" }
            minDate={ minDate ? dayjs( minDate ) : undefined }
            maxDate={ maxDate ? dayjs( maxDate ) : undefined }
            value={ value ? dayjs( value ) : undefined }
            status={error ? "error" : undefined}
            onChange={(date) => {
                onChange( date?.format( showTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD") );
            }}
            disabledDate={disabledDate}
        />
    );
};

export const datePickerMeta: CodeComponentMeta<DatePickerProps> = {
    name: "DatePicker",
    displayName: "Date Picker",
    states : {
        value : {
            type : "writable",
            variableType : "text",
            valueProp : "value",
            onChangeProp : "onChange",
        },
    },
    props: {
        value: {
            type: "string",
        },
        disabled: {
            type: "boolean",
            defaultValue: false,
        },
        minDate: {
            type: "string",
        },
        allowClear: {
            type: "boolean",
            defaultValue: false,
        },
        maxDate: {
            type: "string",
        },
        picker: {
            type: "choice",
            options: ["date", "week", "month", "quarter", "year"],
            defaultValue: "date",
        },
        placeholder: {
            type: "string",
            defaultValue: "Seleccionar...",
        },
        size: {
            type: "choice",
            options: ["small", "middle", "large"],
            defaultValue: "middle",
        },
        error: {
            type: "string",
        },
        showTime: {
            type: "boolean",
            defaultValue: false,
        },
        variant: {
            type: "choice",
            options: ["outlined", "borderless", "filled"],
            defaultValue: "outlined",
        },
        onChange : {
            type: "eventHandler",
            argTypes : [],
        },
        disabledDates: {
            type: "array",
            defaultValue: [],
            description: "Array of dates to be disabled in the date picker",
        },
    },
    importPath: "inprodi-design-system",
    importName: "DatePicker",
};

export function registerDatePicker(
    loader?: Registerable,
    customDatePickerMeta?: CodeComponentMeta<DatePickerProps>
) {
    const doRegisterComponent: typeof registerComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(DatePicker, customDatePickerMeta ?? datePickerMeta);
}