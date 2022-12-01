import React from 'react';

import {Row, Space, Spin} from "antd";

export const Preloader = () => {
    return (
        <Row justify={"center"} align={"middle"} style={{height:'100vh'}}>
            <Space size="large">
                <Spin size="large"/>
            </Space>
        </Row>
    );
};

