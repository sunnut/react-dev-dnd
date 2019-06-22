import React from 'react';
import { Pie } from 'ant-design-pro/lib/Charts';

const LineComponent = (props) => {
    return (
        <>
            <Pie percent={28} subTitle="中式快餐" total="28%" height={140} />
        </>
    );
};

export default LineComponent;