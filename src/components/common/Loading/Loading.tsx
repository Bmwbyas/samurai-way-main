import React from 'react';
import {Spin} from "antd";
import s from './LoadingContainer.module.css'

export const Loading: React.FC = () => {

    return (
        <div className={s.progressContainer}>
            <Spin style={{top:0,right:'50%'}} tip="Loading" size="large"/>
         </div>
    );
};

