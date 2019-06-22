import React from 'react';
import { Bar } from 'ant-design-pro/lib/Charts';

const salesData = [];

for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const BarComponent = (props) => {
    return (
        <>
            <Bar height={200} title="销售额趋势" data={salesData} />
        </>
    );
};

export default BarComponent;