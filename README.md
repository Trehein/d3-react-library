# A Simple React Pie Chart Component

## Installation

```
npm i d3-react-pie-chart
```

## Example Usage

<!-- prettier-ignore -->
```javascript
import { PieChart } from 'd3-react-pie-chart';

const MyPieChart = () => {
    const sampleData = [
        {type: 'TypeA', value: 7}
        {type: 'TypeB', value: 4}
        {type: 'TypeC', value: 2}
        {type: 'TypeD', value: 2}
        {type: 'TypeE', value: 3}
        {type: 'TypeF', value: 5}
    ]
    const dataAccessorField: string = 'value' // field name of the data value
    const dataLabelField: string = 'type' // field name of the label value
    const innerRadius: number = 0.35 // OPTIONAL - creates a donut - Valid values 0 - 0.35
    const dimensions: { height: number } = {height: 300} // determines both height and width of the chart

  return 
    <PieChart 
        data={sampleData}
        dataAccessorField={dataAccessorField}
        dataLabelField={dataLabelField}
        dimensions={dimensions}
        innerRadius={innerRadius}
    />;
};

export default MyPieChart;
```
