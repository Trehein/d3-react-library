import React from 'react';
import { pie, arc } from 'd3-shape';
export const PieChart = (props) => {
    const { data, dataAccessorField, innerRadius, dimensions, dataLabelField } = props;
    const radius = {
        inner: innerRadius ? dimensions.height * innerRadius : 0,
        outer: dimensions.height * 0.49,
    };
    const dataValueAccessor = (d) => d[dataAccessorField];
    const dataLabelAccessor = (d) => d[dataLabelField];
    const defaultColorPalette = ['#6e40aa', '#bf3caf', '#fe4b83', '#ff7847', '#e2b72f', '#aff05b', '#52f667', '#1ddfa3', '#23abd8', '#4c6edb', '#6e40aa'];
    const defaultFillSetter = (index) => {
        return index < 10 ? defaultColorPalette[index] : defaultColorPalette[index - 10];
    };
    const pieGenerator = pie()
        .value((d) => dataValueAccessor(d))
        .sort((a, b) => dataValueAccessor(a) - dataValueAccessor(b));
    // .sort((a: any, b: any) => dataLabelAccessor(a).localeCompare(dataLabelAccessor(b))); // sorts string values
    const generatedPieData = pieGenerator(data);
    const Pie = (props) => {
        const { data } = props;
        const arcPiece = arc().innerRadius(radius.inner).outerRadius(radius.outer);
        const labelArc = arc()
            .innerRadius(radius.outer * 0.75)
            .outerRadius(radius.outer);
        return data.map((data, index) => {
            const labelArcCenter = labelArc.centroid(data);
            return (React.createElement("g", { key: index, cursor: "pointer" },
                React.createElement("path", { d: arcPiece(data), fill: defaultFillSetter(index), id: `${(data) => dataLabelAccessor(data)}-id`, stroke: "white", strokeWidth: ".5" }),
                ";",
                React.createElement("g", null,
                    React.createElement("circle", { cx: labelArcCenter[0], cy: labelArcCenter[1], r: dimensions.height * 0.04, fill: 'white', opacity: 0.85 }),
                    React.createElement("text", { x: labelArcCenter[0], y: labelArcCenter[1], fill: 'black', fontFamily: 'Arial', textAnchor: 'middle', dominantBaseline: 'middle', fontSize: dimensions.height * 0.045 }, dataValueAccessor(data)))));
        });
    };
    return (React.createElement("svg", { height: dimensions.height, width: dimensions.height },
        React.createElement("g", { transform: `translate(${dimensions.height * 0.5}, ${dimensions.height * 0.5})` },
            React.createElement(Pie, { data: generatedPieData }))));
};
