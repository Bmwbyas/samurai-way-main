import React from 'react';

import { Input } from 'antd';


export const Search = () => {
    const { Search } = Input;


    const onSearch = (value: string) => {
        console.log(value)
    };

    return (
       <>
               <Search placeholder="input search text" onSearch={onSearch} enterButton />
       </>
    );
};

