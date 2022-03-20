import React from 'react';
import { pie, arc } from 'd3-shape';

export const PieChart = (props: { data: any; innerRadius?: number; dimensions: { height: number }; dataAccessorField: 'string'; dataLabelField: 'string' }) => {
  const { data, dataAccessorField, innerRadius, dimensions, dataLabelField } = props;
  const radius = {
    inner: innerRadius ? dimensions.height * innerRadius : 0,
    outer: dimensions.height * 0.49,
  };

  const dataValueAccessor = (d: any) => d[dataAccessorField];
  const dataLabelAccessor = (d: any) => d[dataLabelField];

  const defaultColorPalette = ['#6e40aa', '#bf3caf', '#fe4b83', '#ff7847', '#e2b72f', '#aff05b', '#52f667', '#1ddfa3', '#23abd8', '#4c6edb', '#6e40aa'];
  const defaultFillSetter = (index: number) => {
    return index < 10 ? defaultColorPalette[index] : defaultColorPalette[index - 10];
  };

  const pieGenerator = pie()
    .value((d: any) => dataValueAccessor(d))
    .sort((a: any, b: any) => dataValueAccessor(a) - dataValueAccessor(b));
  // .sort((a: any, b: any) => dataLabelAccessor(a).localeCompare(dataLabelAccessor(b))); // sorts string values

  const generatedPieData = pieGenerator(data);

  const Pie = (props: any) => {
    const { data } = props;
    const arcPiece = arc().innerRadius(radius.inner).outerRadius(radius.outer);
    const labelArc = arc()
      .innerRadius(radius.outer * 0.75)
      .outerRadius(radius.outer);

    return data.map((data: any, index: number) => {
      const labelArcCenter = labelArc.centroid(data);
      return (
        <g key={index} cursor="pointer">
          <path d={arcPiece(data)} fill={defaultFillSetter(index)} id={`${(data: any) => dataLabelAccessor(data)}-id`} stroke="white" strokeWidth=".5" />;
          <g>
            <circle cx={labelArcCenter[0]} cy={labelArcCenter[1]} r={dimensions.height * 0.04} fill={'white'} opacity={0.85} />
            <text x={labelArcCenter[0]} y={labelArcCenter[1]} fill={'black'} fontFamily={'Arial'} textAnchor={'middle'} dominantBaseline={'middle'} fontSize={dimensions.height * 0.045}>
              {dataValueAccessor(data)}
            </text>
          </g>
        </g>
      );
    });
  };

  return (
    <svg height={dimensions.height} width={dimensions.height}>
      <g transform={`translate(${dimensions.height * 0.5}, ${dimensions.height * 0.5})`}>
        <Pie data={generatedPieData} />
      </g>
    </svg>
  );
};
