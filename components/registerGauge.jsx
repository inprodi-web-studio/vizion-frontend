import React from "react";
import registerComponent from "@plasmicapp/host/registerComponent";

import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

export const Gauge = ({
    ...props
}) => {

    return <GaugeComponent
        {...props}
    />;
};

export const gaugeMeta = {
    name: "Gauge",
    displayName: "Gauge",
    props: {
        type : {
            type : "choice",
            options : ["grafana", "semicircle", "radial"],
            defaultValue : "grafana",
        },
        marginInPercent : {
            type : "object",
        },
        value : {
            type : "number",
            defaultValue : 33,
        },
        minValue : {
            type : "number",
            defaultValue : 0,
        },
        maxValue : {
            type : "number",
            defaultValue : 100,
        },
        arc : {
            type : "object",
        },
        pointer : {
            type : "object",
        },
        labels : {
            type : "object",
        },
        style : {
            type : "object",
        },
    },
    importPath: "inprodi-design-system",
    importName: "Gauge",
};

export function registerGauge(
    loader,
    customGaugeMeta,
) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(Gauge, customGaugeMeta ?? gaugeMeta);
}