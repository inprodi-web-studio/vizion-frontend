import dynamic from "next/dynamic";
import React, { forwardRef, useImperativeHandle } from "react";
const ResponsiveLine = dynamic(() => import("@nivo/line").then(mod => mod.ResponsiveLine), { ssr: false });
  
const CreditHistoryLineChart = forwardRef(({
    className,
}, ref) => {
    useImperativeHandle(ref, () => ({

    }));

    const data = [
        {
          id: "used",
          data: [
            { x: "2024-11-01", y: 125043 },
            { x: "2024-11-02", y: 127893 },
            { x: "2024-11-03", y: 132098 },
            { x: "2024-11-04", y: 98038 },
            { x: "2024-11-05", y: 148930 },
            { x: "2024-11-06", y: 102987 },
            { x: "2024-11-07", y: 154099 },
            { x: "2024-11-08", y: 129809 },
            { x: "2024-11-09", y: 97098 },
            { x: "2024-11-10", y: 114878 },
            { x: "2024-11-11", y: 126897 },
            { x: "2024-11-12", y: 102857 },
            { x: "2024-11-13", y: 198560 },
            { x: "2024-11-14", y: 160988 },
            { x: "2024-11-15", y: 129678 },
            { x: "2024-11-16", y: 178833 },
            { x: "2024-11-17", y: 128098 },
            { x: "2024-11-18", y: 142789 },
            { x: "2024-11-19", y: 92098 },
            { x: "2024-11-20", y: 150049 },
            { x: "2024-11-21", y: 124789 },
            { x: "2024-11-22", y: 112988 },
            { x: "2024-11-23", y: 114987 },
            { x: "2024-11-24", y: 92678 },
            { x: "2024-11-25", y: 112987 },
            { x: "2024-11-26", y: 150049 },
            { x: "2024-11-27", y: 112988 },
            { x: "2024-11-28", y: 112987 },
            { x: "2024-11-29", y: 142789 },
            { x: "2024-11-30", y: 112987 },
            { x: "2024-12-01", y: 125043 },
            { x: "2024-12-02", y: 127893 },
            { x: "2024-12-03", y: 132098 },
            { x: "2024-12-04", y: 98038 },
            { x: "2024-12-05", y: 148930 },
            { x: "2024-12-06", y: 102987 },
            { x: "2024-12-07", y: 154099 },
            { x: "2024-12-08", y: 129809 },
            { x: "2024-12-09", y: 97098 },
            { x: "2024-12-10", y: 114878 },
            { x: "2024-12-11", y: 126897 },
            { x: "2024-12-12", y: 102857 },
            { x: "2024-12-13", y: 198560 },
            { x: "2024-12-14", y: 160988 },
            { x: "2024-12-15", y: 129678 },
            { x: "2024-12-16", y: 178833 },
            { x: "2024-12-17", y: 128098 },
            { x: "2024-12-18", y: 142789 },
            { x: "2024-12-19", y: 92098 },
            { x: "2024-12-20", y: 150049 },
            { x: "2024-12-21", y: 124789 },
            { x: "2024-12-22", y: 112988 },
            { x: "2024-12-23", y: 114987 },
            { x: "2024-12-24", y: 92678 },
            { x: "2024-12-25", y: 112987 },
            { x: "2024-12-26", y: 150049 },
            { x: "2024-12-27", y: 112988 },
            { x: "2024-12-28", y: 112987 },
            { x: "2024-12-29", y: 142789 },
            { x: "2024-12-30", y: 112987 },
            { x: "2024-12-31", y: 112988 },
            { x: "2025-01-01", y: 125043 },
            { x: "2025-01-02", y: 127893 },
            { x: "2025-01-03", y: 132098 },
            { x: "2025-01-04", y: 98038 },
            { x: "2025-01-05", y: 148930 },
            { x: "2025-01-06", y: 102987 },
            { x: "2025-01-07", y: 154099 },
            { x: "2025-01-08", y: 129809 },
            { x: "2025-01-09", y: 97098 },
            { x: "2025-01-10", y: 114878 },
            { x: "2025-01-11", y: 126897 },
            { x: "2025-01-12", y: 102857 },
            { x: "2025-01-13", y: 198560 },
            { x: "2025-01-14", y: 160988 },
            { x: "2025-01-15", y: 129678 },
            { x: "2025-01-16", y: 178833 },
            { x: "2025-01-17", y: 128098 },
            { x: "2025-01-18", y: 142789 },
            { x: "2025-01-19", y: 92098 },
            { x: "2025-01-20", y: 150049 },
            { x: "2025-01-21", y: 124789 },
            { x: "2025-01-22", y: 112988 },
            { x: "2025-01-23", y: 114987 },
            { x: "2025-01-24", y: 92678 },
            { x: "2025-01-25", y: 112987 },
          ],
        },
        {
          id: "due",
          data: [
            { x: "2024-11-01", y: 26987 },
            { x: "2024-11-02", y: 32987 },
            { x: "2024-11-03", y: 14987 },
            { x: "2024-11-04", y: 0 },
            { x: "2024-11-05", y: 0 },
            { x: "2024-11-06", y: 6789 },
            { x: "2024-11-07", y: 16764 },
            { x: "2024-11-08", y: 25098 },
            { x: "2024-11-09", y: 15098 },
            { x: "2024-11-10", y: 12987 },
            { x: "2024-11-11", y: 10876 },
            { x: "2024-11-12", y: 12098 },
            { x: "2024-11-13", y: 20956 },
            { x: "2024-11-14", y: 12987 },
            { x: "2024-11-15", y: 3002 },
            { x: "2024-11-16", y: 6987 },
            { x: "2024-11-17", y: 10767 },
            { x: "2024-11-18", y: 26097 },
            { x: "2024-11-19", y: 52897 },
            { x: "2024-11-20", y: 49767 },
            { x: "2024-11-21", y: 38567 },
            { x: "2024-11-22", y: 46783 },
            { x: "2024-11-23", y: 12784 },
            { x: "2024-11-24", y: 18367 },
            { x: "2024-11-25", y: 9387 },
            { x: "2024-11-26", y: 46783 },
            { x: "2024-11-27", y: 12784 },
            { x: "2024-11-28", y: 18367 },
            { x: "2024-11-29", y: 9387 },
            { x: "2024-11-30", y: 46783 },
            { x: "2024-12-01", y: 26987 },
            { x: "2024-12-02", y: 32987 },
            { x: "2024-12-03", y: 14987 },
            { x: "2024-12-04", y: 0 },
            { x: "2024-12-05", y: 0 },
            { x: "2024-12-06", y: 6789 },
            { x: "2024-12-07", y: 16764 },
            { x: "2024-12-08", y: 25098 },
            { x: "2024-12-09", y: 15098 },
            { x: "2024-12-10", y: 12987 },
            { x: "2024-12-11", y: 10876 },
            { x: "2024-12-12", y: 12098 },
            { x: "2024-12-13", y: 20956 },
            { x: "2024-12-14", y: 12987 },
            { x: "2024-12-15", y: 3002 },
            { x: "2024-12-16", y: 6987 },
            { x: "2024-12-17", y: 10767 },
            { x: "2024-12-18", y: 26097 },
            { x: "2024-12-19", y: 52897 },
            { x: "2024-12-20", y: 49767 },
            { x: "2024-12-21", y: 38567 },
            { x: "2024-12-22", y: 46783 },
            { x: "2024-12-23", y: 12784 },
            { x: "2024-12-24", y: 18367 },
            { x: "2024-12-25", y: 9387 },
            { x: "2024-12-26", y: 46783 },
            { x: "2024-12-27", y: 12784 },
            { x: "2024-12-28", y: 18367 },
            { x: "2024-12-29", y: 9387 },
            { x: "2024-12-30", y: 46783 },
            { x: "2024-12-31", y: 12784 },
            { x: "2025-01-01", y: 26987 },
            { x: "2025-01-02", y: 32987 },
            { x: "2025-01-03", y: 14987 },
            { x: "2025-01-04", y: 0 },
            { x: "2025-01-05", y: 0 },
            { x: "2025-01-06", y: 6789 },
            { x: "2025-01-07", y: 16764 },
            { x: "2025-01-08", y: 25098 },
            { x: "2025-01-09", y: 15098 },
            { x: "2025-01-10", y: 12987 },
            { x: "2025-01-11", y: 10876 },
            { x: "2025-01-12", y: 12098 },
            { x: "2025-01-13", y: 20956 },
            { x: "2025-01-14", y: 12987 },
            { x: "2025-01-15", y: 3002 },
            { x: "2025-01-16", y: 6987 },
            { x: "2025-01-17", y: 10767 },
            { x: "2025-01-18", y: 26097 },
            { x: "2025-01-19", y: 52897 },
            { x: "2025-01-20", y: 49767 },
            { x: "2025-01-21", y: 38567 },
            { x: "2025-01-22", y: 46783 },
            { x: "2025-01-23", y: 12784 },
            { x: "2025-01-24", y: 18367 },
            { x: "2025-01-25", y: 9387 },
          ],
        },
        {
          id: "limit",
          data: [
            { x: "2024-11-01", y: 200000 },
            { x: "2024-11-02", y: 200000 },
            { x: "2024-11-03", y: 200000 },
            { x: "2024-11-04", y: 200000 },
            { x: "2024-11-05", y: 200000 },
            { x: "2024-11-06", y: 200000 },
            { x: "2024-11-07", y: 200000 },
            { x: "2024-11-08", y: 200000 },
            { x: "2024-11-09", y: 200000 },
            { x: "2024-11-10", y: 200000 },
            { x: "2024-11-11", y: 200000 },
            { x: "2024-11-12", y: 200000 },
            { x: "2024-11-13", y: 200000 },
            { x: "2024-11-14", y: 200000 },
            { x: "2024-11-15", y: 200000 },
            { x: "2024-11-16", y: 200000 },
            { x: "2024-11-17", y: 200000 },
            { x: "2024-11-18", y: 200000 },
            { x: "2024-11-19", y: 200000 },
            { x: "2024-11-20", y: 200000 },
            { x: "2024-11-21", y: 200000 },
            { x: "2024-11-22", y: 200000 },
            { x: "2024-11-23", y: 200000 },
            { x: "2024-11-24", y: 200000 },
            { x: "2024-11-25", y: 200000 },
            { x: "2024-11-26", y: 200000 },
            { x: "2024-11-27", y: 200000 },
            { x: "2024-11-28", y: 200000 },
            { x: "2024-11-29", y: 200000 },
            { x: "2024-11-30", y: 200000 },
            { x: "2024-12-01", y: 200000 },
            { x: "2024-12-02", y: 200000 },
            { x: "2024-12-03", y: 200000 },
            { x: "2024-12-04", y: 200000 },
            { x: "2024-12-05", y: 200000 },
            { x: "2024-12-06", y: 200000 },
            { x: "2024-12-07", y: 200000 },
            { x: "2024-12-08", y: 200000 },
            { x: "2024-12-09", y: 200000 },
            { x: "2024-12-10", y: 200000 },
            { x: "2024-12-11", y: 200000 },
            { x: "2024-12-12", y: 200000 },
            { x: "2024-12-13", y: 200000 },
            { x: "2024-12-14", y: 200000 },
            { x: "2024-12-15", y: 200000 },
            { x: "2024-12-16", y: 200000 },
            { x: "2024-12-17", y: 200000 },
            { x: "2024-12-18", y: 200000 },
            { x: "2024-12-19", y: 200000 },
            { x: "2024-12-20", y: 200000 },
            { x: "2024-12-21", y: 200000 },
            { x: "2024-12-22", y: 200000 },
            { x: "2024-12-23", y: 200000 },
            { x: "2024-12-24", y: 200000 },
            { x: "2024-12-25", y: 200000 },
            { x: "2024-12-26", y: 200000 },
            { x: "2024-12-27", y: 200000 },
            { x: "2024-12-28", y: 200000 },
            { x: "2024-12-29", y: 200000 },
            { x: "2024-12-30", y: 200000 },
            { x: "2024-12-31", y: 200000 },
            { x: "2025-01-01", y: 200000 },
            { x: "2025-01-02", y: 200000 },
            { x: "2025-01-03", y: 200000 },
            { x: "2025-01-04", y: 200000 },
            { x: "2025-01-05", y: 200000 },
            { x: "2025-01-06", y: 200000 },
            { x: "2025-01-07", y: 200000 },
            { x: "2025-01-08", y: 200000 },
            { x: "2025-01-09", y: 200000 },
            { x: "2025-01-10", y: 200000 },
            { x: "2025-01-11", y: 200000 },
            { x: "2025-01-12", y: 200000 },
            { x: "2025-01-13", y: 200000 },
            { x: "2025-01-14", y: 200000 },
            { x: "2025-01-15", y: 200000 },
            { x: "2025-01-16", y: 200000 },
            { x: "2025-01-17", y: 200000 },
            { x: "2025-01-18", y: 250000 },
            { x: "2025-01-19", y: 250000 },
            { x: "2025-01-20", y: 250000 },
            { x: "2025-01-21", y: 250000 },
            { x: "2025-01-22", y: 250000 },
            { x: "2025-01-23", y: 300000 },
            { x: "2025-01-24", y: 300000 },
            { x: "2025-01-25", y: 300000 },
          ],
        },
    ];

    const colorMap = {
        used : "#4096FF",
        due : "#FF4D4F",
        limit : "#13C2C2"
    };

    const GridDots = ({ xScale, yScale }) => {
        const xTicks = xScale.ticks ? xScale.ticks(30) : xScale.domain();
        const yTicks = yScale.ticks ? yScale.ticks(5) : yScale.domain();
    
        return (
            <>
                {xTicks.map((tickX, i) =>
                    yTicks.map((tickY, j) => {
                        const xPos = xScale(tickX);
                        const yPos = yScale(tickY);

                        return (
                            <circle
                                key={`dot-${i}-${j}`}
                                cx={xPos}
                                cy={yPos}
                                r={1}
                                fill="#ced4da"
                            />
                        );
                    })
                )}
            </>
        );
    };
  
    return (
        <div className={ className } style={{ width: "100%", height: "200px" }}>
            <ResponsiveLine
                animate
                data={data}
                pointSize={0}
                enableSlices="x"
                crosshairType="x"
                lineWidth={2.5}
                useMesh={true}
                layers={[
                    "axes",
                    GridDots,
                    'crosshair',
                    "lines",
                    "points",
                    "slices",
                    "mesh",
                ]}
                xScale={{
                    type : "time",
                    format : "%Y-%m-%d",
                    precision : "day",
                    useUTC : false
                }}
                axisBottom={{
                    format: (value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("es-ES", { month: "short", year: "numeric" });
                    },
                    tickValues: "every 1 month",
                    tickSize: 0,
                    tickPadding: 7,
                    tickRotation: 0,
                    legend: "",
                }}
                theme={{
                    axis : {
                        domain : {
                            line : {
                                stroke : "var(--plasmic-token-border-primary)",
                                strokeWidth : 1,
                            }
                        },
                        ticks : {
                            text : {
                                fontSize : 12,
                                fill : "var(--plasmic-token-text-secondary)",
                            }
                        }
                    }
                }}
                axisLeft={null}
                curve="monotoneX"
                enablePoints={true}
                margin={{
                    left : 1.5,
                    right : 1.5,
                    bottom : 23,
                    top : 5
                }}
                colors={ ({ id }) => colorMap[id] }
            />
        </div>
    );
});

CreditHistoryLineChart.displayName = "CreditHistoryLineChart";

export const creditHistoryLineChartMeta = {
    name: "CreditHistoryLineChart",
    displayName: "Credit History Line Chart",
    props : {

    },
    refActions : {

    },
    importPath: "inprodi-design-system",
    importName: "CreditHistoryLineChart",
};

export function registerCreditHistoryLineChart(
    loader,
    customCreditHistoryLineChartMeta,
) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(CreditHistoryLineChart, customCreditHistoryLineChartMeta ?? creditHistoryLineChartMeta);
};