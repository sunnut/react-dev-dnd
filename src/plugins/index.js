import Bar from './bar-chart/view';
import LineChart from './line-chart/view';
import PieChart from './pie-chart/view';

// import React from 'react';

// const BarPromise = import('./bar-chart/view');
// const Bar = React.lazy(() => BarPromise);
//
// const LineChartPromise = import('./line-chart/view');
// const LineChart = React.lazy(() => LineChartPromise);
//
// const PieChartPromise = import('./pie-chart/view');
// const PieChart = React.lazy(() => PieChartPromise);

const pluginInfo = [{
  name: 'bar-chart',
  icon: 'bar-chart',
  title: '柱状图'
}, {
  name: 'line-chart',
  icon: 'line-chart',
  title: '线状图'
}, {
  name: 'pie-chart',
  icon: 'pie-chart',
  title: '饼图'
}];

const pluginMap = {
  'bar-chart': Bar,
  'line-chart': LineChart,
  'pie-chart': PieChart
};

export {pluginMap, pluginInfo};