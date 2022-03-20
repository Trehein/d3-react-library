import React from 'react';
import { PieChart } from '../components/PieChart';

export default {
  title: 'PieChart',
  component: PieChart,
};

const Template = (args) => <PieChart {...args} />;
const baseArgs = {
  data: [
    { value: 112, type: 'complete' },
    { value: 42, type: 'inProgress' },
    { value: 24, type: 'overdue' },
    { value: 112, type: 'complete' },
    { value: 42, type: 'inProgress' },
    { value: 24, type: 'overdue' },
    { value: 112, type: 'complete' },
    { value: 42, type: 'inProgress' },
    { value: 24, type: 'overdue' },
  ],
  dimensions: { height: 300 },
  innerRadius: 0.35,
  dataAccessorField: 'value',
  dataLabelField: 'type',
};

export const Default = Template.bind({});
Default.args = baseArgs;

export const Small = Template.bind({});
Small.args = { ...baseArgs, dimensions: { height: 100 } };

export const Large = Template.bind({});
Large.args = { ...baseArgs, dimensions: { height: 700 } };
