import React, { forwardRef, useImperativeHandle } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import registerComponent from "@plasmicapp/host/registerComponent";

const InteractionsCalendar = forwardRef(({ className, data }, ref) => {
    useImperativeHandle(ref, () => ({}));

    const end = dayjs();
    const start = end.subtract(5, "month").startOf("month");
    const startDate = start.format("YYYY-MM-DD");
    const endDate = end.endOf("month").format("YYYY-MM-DD");

    const maxValue = Math.max(...data.map(item => Number(item[1])));

    const option = {
        tooltip: {
            position: "top",
            borderWidth: 1,
            borderColor: "#CED4DA",
            padding: 10,
            formatter: function (params) {
                const date = dayjs(params.data[0]).format("DD MMM, YYYY");
                const value = params.data[1];
                return `${date} - ${value} ${value === 1 ? "Interacción" : "Interacciones"}`;
            },
            textStyle: {
                fontSize: 12,
                fontWeight: 500,
                color: "#000000",
            },
        },
        visualMap: {
            show: false,
            min: 0,
            max: maxValue === 0 ? 1 : maxValue,
        },
        textStyle: {
            fontFamily: "Geist Sans",
        },
        calendar: {
            top: 24,
            left: 0,
            right: 0,
            bottom: 0,
            range: [startDate, endDate],
            cellSize: ["auto", 20],
            orient: "horizontal",
            dayLabel: { firstDay: 1, nameMap: "en" },
            yearLabel: { show: false },
            splitLine: {
                show: false,
            },
            monthLabel: {
                color: "#00000073",
                nameMap: [
                    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
                ],
            },
            itemStyle: {
                color: "#F5F5F5",
                borderWidth: 2,
                borderColor: "#ffffff",
            },
        },
        series: {
            type: "heatmap",
            coordinateSystem: "calendar",
            data,
            itemStyle: {
                borderWidth: 2,
                borderColor: "#ffffff",
                borderRadius: 4,
            },
        },
    };

    return (
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
    );
});

InteractionsCalendar.displayName = "InteractionsCalendar";

export const interactionsCalendarMeta = {
    name: "InteractionsCalendar",
    displayName: "Interactions Calendar",
    props: {
        data: {
            type: "object",
            defaultValue: [],
        },
    },
    refActions: {},
    importPath: "inprodi-design-system",
    importName: "InteractionsCalendar",
};

export function registerInteractionsCalendar(loader, customInteractionsCalendarMeta) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(InteractionsCalendar, customInteractionsCalendarMeta ?? interactionsCalendarMeta);
}