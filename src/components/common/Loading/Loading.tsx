import React from 'react';
import {Spin} from "antd";
import s from './LoadingContainer.module.css'

export const Loading: React.FC = () => {

    return (
        <div className={s.progressContainer}>
            <Spin tip="Loading" size="large"/>
         </div>
    );
};

