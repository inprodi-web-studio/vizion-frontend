import React, { forwardRef, useImperativeHandle } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import formatCurrency from "@/helpers/formatCurrency";
  
const CreditHistoryChart = forwardRef(({
    className,
}, ref) => {
    useImperativeHandle(ref, () => ({

    }));
  
    return (
          <ReactECharts
            style={{ width: "100%", height: "250px" }}
            className={ className }
            option={{
              legend : {
                show : true,
                left : "left",
                top : "top",
                itemGap : 20,
                selectedMode : false,
                textStyle : {
                  color : "#00000073"
                },
              },
              textStyle : {
                fontFamily : "Geist Sans",
              },
              tooltip: {
                trigger: "axis",
                borderWidth: 1,
                borderColor: "#CED4DA",
                formatter : (params) => {
                  const xValue = params[0].axisValue;
                  const formattedXValue = dayjs( xValue ).format( "DD MMM, YYYY" );

                  let tooltipContent = `
                    <div style="width: fit-content; min-width: 150px;display: flex; flex-direction: column; color: rgba(0, 0, 0, 0.88)">
                      <div style="font-size: 14px; font-weight: 500; line-height: 1;">
                        ${ formattedXValue }
                      </div>

                      <div style="width: 100%; display: flex; flex-direction: column; margin-top: 18px;">
                  `;

                  params.forEach( item => {
                    let usedByLimit = 0;
                    let dueByUsed   = 0;

                    if (item.seriesName === "En Uso") {
                      const used = item.data;
                      const limit = params.find( i => i.seriesName === "Límite" ).data;

                      usedByLimit = (used / limit) * 100;
                    }

                    if (item.seriesName === "Vencido") {
                      const due = item.data;
                      const used = params.find( i => i.seriesName === "En Uso" ).data;

                      dueByUsed = (due / used) * 100;
                    }
                    
                    tooltipContent += `
                      <div style="width : 100%;display: flex; flex-direction: row; align-items: center; height: 28px;">
                        <div style="height: 100%; width: 4px; background-color: ${ item.color }; border-radius: 10px;"></div>
                        <div style="display: flex; flex-direction: column; gap: 4px; margin-left: 10px">
                          <span style="font-size: 12px; font-weight: 500; color: rgba(0, 0, 0, 0.88); line-height: 1;">
                            ${ formatCurrency(item.data) }
                          </span>

                          ${ item.seriesName === "En Uso" ? `
                            <span style="font-size: 10px; font-weight: 400; color: rgba(0, 0, 0, 0.45); line-height: 1;">
                              ${usedByLimit.toFixed(2)}% sobre el límite
                            </span>
                          ` : ""}

                          ${ item.seriesName === "Vencido" ? `
                            <span style="font-size: 10px; font-weight: 400; color: rgba(0, 0, 0, 0.45); line-height: 1;">
                              ${ dueByUsed.toFixed(2) }% sobre lo usado
                            </span>
                          ` : ""}
                        </div>
                      </div>

                      ${ item.seriesName !== "Vencido" ? `
                       <hr style="width: 100%; height: 1px; background-color: #E9ECEF; border: none; margin: 10px 0" />
                      ` : ""}
                    `;
                  });

                  tooltipContent += `
                    </div>
                  </div>
                  `;

                  return tooltipContent;
                },
                padding : 10,
              },
              grid : {
                left: 0,
                right: 0,
                top: 45,
                bottom: 10,
                containLabel: true
              },
              xAxis: {
                type: "category",
                data: [
                  "2024-10-25","2024-10-26","2024-10-27","2024-10-28","2024-10-29","2024-10-30","2024-10-31",
                  "2024-11-01","2024-11-02","2024-11-03","2024-11-04","2024-11-05","2024-11-06","2024-11-07",
                  "2024-11-08","2024-11-09","2024-11-10","2024-11-11","2024-11-12","2024-11-13","2024-11-14",
                  "2024-11-15","2024-11-16","2024-11-17","2024-11-18","2024-11-19","2024-11-20","2024-11-21",
                  "2024-11-22","2024-11-23","2024-11-24","2024-11-25","2024-11-26","2024-11-27","2024-11-28",
                  "2024-11-29","2024-11-30",
                  "2024-12-01","2024-12-02","2024-12-03","2024-12-04","2024-12-05","2024-12-06","2024-12-07",
                  "2024-12-08","2024-12-09","2024-12-10","2024-12-11","2024-12-12","2024-12-13","2024-12-14",
                  "2024-12-15","2024-12-16","2024-12-17","2024-12-18","2024-12-19","2024-12-20","2024-12-21",
                  "2024-12-22","2024-12-23","2024-12-24","2024-12-25","2024-12-26","2024-12-27","2024-12-28",
                  "2024-12-29","2024-12-30","2024-12-31",
                  "2025-01-01","2025-01-02","2025-01-03","2025-01-04","2025-01-05","2025-01-06","2025-01-07",
                  "2025-01-08","2025-01-09","2025-01-10","2025-01-11","2025-01-12","2025-01-13","2025-01-14",
                  "2025-01-15","2025-01-16","2025-01-17","2025-01-18","2025-01-19","2025-01-20","2025-01-21",
                  "2025-01-22","2025-01-23","2025-01-24","2025-01-25"
                ],
                splitLine : {
                  show: true,
                  interval: (index, value) => {
                    const [year, month, day] = value.split("-");

                    return day === "01";
                  },
                  lineStyle : {
                    width : 1,
                    color : "#CED4DA"
                  }
                },
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
                  interval: 0,
                  color : "#00000073",
                  formatter: (value) => {
                    const [year, month, day] = value.split("-");

                    if (day === "01") {
                      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
                                          "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

                      const monthIndex = parseInt(month, 10) - 1;

                      return `${monthNames[monthIndex]} ${year}`;
                    }

                    return "";
                  }
                },
              },
              yAxis: {
                axisLabel : {
                  show : false
                },
                splitLine : {
                  show : true,
                  lineStyle : {
                    type : 10,
                    width : 1,
                    color : "#CED4DA"
                  }
                },
              },
              series: [
                {
                  id : "limit",
                  name: "Límite",
                  type: "line",
                  showSymbol: false,
                  emphasis : {
                    focus : "series",
                    showSymbol : true
                  },
                  data: [
                    300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
                    300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
                    300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
                    300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
                    300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
                    300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
                    300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
                    300000, 300000, 350000, 350000, 350000, 350000, 350000, 350000, 350000, 350000,
                    350000, 350000, 350000, 350000, 375000, 375000, 375000, 375000, 375000, 375000,
                    375000, 375000, 375000
                  ],
                  smooth: false,
                  lineStyle: {
                    width: 3,
                  },
                  areaStyle : {
                    color : {
                      type : "linear",
                      x : 0,
                      y : 0,
                      x2 : 0,
                      y2 : 1,
                      colorStops : [
                        {
                          offset : 0,
                          color : "rgba(22, 194, 193, 0.1)"
                        },
                        {
                          offset : 1,
                          color : "rgba(22, 194, 193, 0.00)"
                        }
                      ],
                    }
                  }
                },
                {
                  id : "used",
                  name: "En Uso",
                  type: "line",
                  showSymbol: false,
                  emphasis : {
                    focus : "series",
                    showSymbol : true
                  },
                  data: [
                    141315,  94050, 105311, 110455, 111722, 145420, 114816, 116961, 108470, 128979,
                    107272,  99652,  93721, 116756,  97262, 110556, 143780, 149235,  95930, 112706,
                    108805, 144106, 119130,  94846, 133602,  99160, 105964, 146050, 141483, 133143,
                     92782, 105083,  91518, 102393, 123189, 116633, 133509,  94194, 142352, 109812,
                     90764, 108595, 108334, 104918, 132580,  92182, 134627, 124256,  95586, 112371,
                    129431, 130661,  97252, 147602, 114961, 128271, 104158, 109059, 149304, 117020,
                    111125, 123255, 142100, 102207,  91666,  98864, 147893,  92611,  99528, 139669,
                    141990, 113972, 144222,  96140,  98610, 139458, 140927, 138472, 125193, 137495,
                    101283, 131163, 146282, 102334, 129072,  92280,  95953,  94152, 147412, 108308,
                    129286, 129277, 115605
                  ],
                  smooth: true,
                  lineStyle: {
                    width: 3,
                  },
                  areaStyle : {
                    color : {
                      type : "linear",
                      x : 0,
                      y : 0,
                      x2 : 0,
                      y2 : 1,
                      colorStops : [
                        {
                          offset : 0,
                          color : "rgba(84, 112, 198, 0.1)"
                        },
                        {
                          offset : 1,
                          color : "rgba(84, 112, 198, 0.00)"
                        }
                      ],
                    }
                  }
                },
                {
                  id : "due",
                  name: "Vencido",
                  type: "line",
                  showSymbol: false,
                  emphasis : {
                    focus : "series",
                    showSymbol : true
                  },
                  data: [
                    12543, 84234,  342,   61557, 55945, 20349, 62770,   158, 18954, 38140,
                    25490, 75744, 46917, 75309, 35974, 43730, 18687, 65264, 23662, 86038,
                    21171, 54417, 12103, 29124, 61417, 64682, 25914, 49969, 50950,  6623,
                    12433, 59286, 40346, 44720, 41031, 23253, 69970, 59169, 37157, 58324,
                    66984, 39516, 87814,  2238, 61400,  3424, 34507, 11255, 14669, 31196,
                    80666, 46686, 16025, 47840, 71203, 21403, 35443, 13615, 40602, 55219,
                    18821,  8291,  3617, 82855,  5379, 78444, 37896, 64136,  2739, 49686,
                    24213, 42257, 65713, 22020, 80785, 32948, 41560, 61145, 62248, 28293,
                    10195, 11215,  7390, 78710, 11859,  1534, 18189, 68422, 19227, 71549,
                    11961, 46858, 51527
                  ],
                  smooth: true,
                  lineStyle: {
                    width: 3,
                  },
                  areaStyle : {
                    color : {
                      type : "linear",
                      x : 0,
                      y : 0,
                      x2 : 0,
                      y2 : 1,
                      colorStops : [
                        {
                          offset : 0,
                          color : "rgba(255, 77, 79, 0.1)"
                        },
                        {
                          offset : 1,
                          color : "rgba(255, 77, 79, 0.00)"
                        }
                      ],
                    }
                  }
                },
              ],
              color : ["#13c2c2", "#4096FF", "#FF4D4F"],
            }}
          />
    );
});

CreditHistoryChart.displayName = "CreditHistoryChart";

export const creditHistoryChartMeta = {
    name: "CreditHistoryChart",
    displayName: "Credit History Chart",
    props : {

    },
    refActions : {

    },
    importPath: "inprodi-design-system",
    importName: "CreditHistoryChart",
};

export function registerCreditHistoryChart(
    loader,
    customCreditHistoryChartMeta,
) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(CreditHistoryChart, customCreditHistoryChartMeta ?? creditHistoryChartMeta);
};