import React, { forwardRef, useImperativeHandle } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import registerComponent from "@plasmicapp/host/registerComponent";

const ProductCategoriesPieChart = forwardRef(({ className, data }, ref) => {
    useImperativeHandle(ref, () => ({}));

    const option = {
        tooltip: {
            trigger: "item",
            borderWidth : 1,
            borderColor : "#CED4DA",
            padding : 10,
            formatter: ({name}) => {
                let tooltipContent = `
                    <div style="width: fit-content; min-width: 150px; display: flex; flex-direction: column; color: rgba(0, 0, 0, 0.88)">
                            <div style="font-size: 12px; font-weight: 500; line-height: 1;">
                                ${name}
                            </div>
                    </div>
                `;

              return tooltipContent;
            },
        },
        legend: {
            show: false,
        },
        textStyle : {
            fontFamily : "Geist Sans",
        },
        series: [
            {
                type: "pie",
                name: "categories",
                padAngle: 3,
                radius: ["60%", "85%"],
                label : {
                    show : false,
                    position : "center",
                    formatter : (params) => {
                        return params.percent + "%";
                    }
                },
                data,
                itemStyle: {
                    borderRadius: 10
                },
                emphasis: {
                    label: {
                      show: true,
                      fontSize: 20,
                      fontWeight: 500
                    }
                },
            },
        ],
    };

    return (
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    );
});

ProductCategoriesPieChart.displayName = "ProductCategoriesPieChart";

export const productCategoriesPieChartMeta = {
    name: "ProductCategoriesPieChart",
    displayName: "Product Categories Pie Chart",
    props: {
        data: {
            type: "object",
            defaultValue: [],
        },
    },
    refActions: {},
    importPath: "inprodi-design-system",
    importName: "ProductCategoriesPieChart",
};

export function registerProductCategoriesPieChart(loader, customProductCategoriesPieChartMeta) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(ProductCategoriesPieChart, customProductCategoriesPieChartMeta ?? productCategoriesPieChartMeta);
}