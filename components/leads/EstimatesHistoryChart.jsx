import formatCurrency from "@/helpers/formatCurrency";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import { forwardRef, useImperativeHandle } from "react";

const EstimatesHistoryChart = forwardRef(({
    data = [],
    range,
    className,
    primaryColor
}, ref) => {
    useImperativeHandle(ref, () => ({

    }));

    const primaryColorValue = getComputedStyle(document.documentElement)
        .getPropertyValue(primaryColor.replaceAll("var(", "").replaceAll(")", ""))
        .trim();

    let dates = [];
    let values = [];

    if (range === 12) {
            const monthlyData = {};
            Object.entries(data)
                .filter(([date]) => dayjs(date).isAfter(dayjs().subtract(range, 'month')))
                .forEach(([date, value]) => {
                    const monthKey = dayjs(date).format("YYYY-MM");
                    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + value;
                });
            dates = Object.keys(monthlyData);
            values = Object.values(monthlyData);
        } else {
            const filteredEntries = Object.entries(data)
                .filter(([date]) => dayjs(date).isAfter(dayjs().subtract(range, 'month')));
            dates = filteredEntries.map(([date]) => date);
            values = filteredEntries.map(([, value]) => value);
        }
    
    return (
          <ReactECharts
            style={{ width: "100%", height: "230px" }}
            className={ className }
            option={{
                tooltip: {
                    trigger: "axis",
                    borderWidth: 1,
                    borderColor: "#CED4DA",
                    padding : 10,
                    axisPointer: {
                      type: "shadow"
                    },
                    formatter: (params) => {
                        const xValue = params[0].axisValue;
                        const formattedXValue = range === 12 
                          ? dayjs(xValue + "-01").format("MMM YYYY")
                          : dayjs(xValue).format("DD MMM, YYYY");
      
                        let tooltipContent = `
                          <div style="width: fit-content; min-width: 150px; display: flex; flex-direction: column; color: rgba(0, 0, 0, 0.88)">
                            <div style="font-size: 14px; font-weight: 500; line-height: 1;">
                              ${formattedXValue}
                            </div>
                            <div style="width: 100%; display: flex; flex-direction: column; margin-top: 18px;">
                        `;
      
                        params.forEach(item => {
                            tooltipContent += `
                            <div style="width: 100%; display: flex; flex-direction: row; align-items: center; height: 28px;">
                              <div style="height: 100%; width: 4px; background-color: ${primaryColor}; border-radius: 10px;"></div>
                              <div style="display: flex; flex-direction: column; gap: 4px; margin-left: 10px">
                                <span style="font-size: 12px; font-weight: 500; color: rgba(0, 0, 0, 0.88); line-height: 1;">
                                  ${formatCurrency(item.data)}
                                </span>
                              </div>
                            </div>
                          `;
                        });
      
                        tooltipContent += `
                            </div>
                          </div>
                        `;
      
                        return tooltipContent;
                    },
                },
                textStyle : {
                    fontFamily : "Geist Sans",
                },
                grid : {
                    left: 15,
                    right: 15,
                    top: 0,
                    bottom: 10,
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    axisLine : {
                        show : true,
                        lineStyle : {
                          width : 2,
                          color : "#CED4DA"
                        }
                    },
                    axisTick : {
                        show : false
                    },
                    axisLabel: {
                        interval: range === 3 ? 6 : range === 6 ? 12 : 1,
                        color : "#00000073",
                        formatter: (value) => {
                            if (range === 12) {
                                const [year, month] = value.split("-");
                                const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                                return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
                            } else {
                                const [year, month, day] = value.split("-");
                                const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                                return `${parseInt(day, 10)} ${monthNames[parseInt(month, 10) - 1]}`;
                            }
                        }
                    },
                    data : dates
                },
                yAxis: {
                    type: "value",
                    axisLabel : {
                        show : false
                    },
                    splitLine : {
                        show : true,
                        lineStyle : {
                          type : 0,
                          width : 1,
                          color : "#CED4DA"
                        }
                    },
                },
                series : [
                    {
                        type: "bar",
                        itemStyle: {
                            color: primaryColorValue,
                        },
                        data: values,
                    },
                ],
            }}
          />
    );
});

EstimatesHistoryChart.displayName = "EstimatesHistoryChart";

export const estimatesHistoryChartMeta = {
    name: "estimatesHistoryChart",
    displayName: "Leads Estimate History Chart",
    props : {
        primaryColor : {
            type: "color",
            defaultValue: "#000000",
        },
        range : {
            type : "number",
            defaultValue : 6,
        },
        data : {
            type : "object",
            defaultValue : [],
        },
    },
    refActions : {

    },
    importPath: "inprodi-design-system",
    importName: "EstimatesHistoryChart",
};

export function registerEstimatesHistoryChart(
    loader,
    customEstimatesHistoryChartMeta,
) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(EstimatesHistoryChart, customEstimatesHistoryChartMeta ?? estimatesHistoryChartMeta);
};