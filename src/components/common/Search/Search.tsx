import React from 'react';

import {Anchor, AutoComplete, Input, SelectProps} from 'antd';
import {UsersDataType} from "../../../Redux/users-reducer";
import {NavLink} from "react-router-dom";

type SearchPropsType = {
    friends: UsersDataType[]
}
export const Search: React.FC<SearchPropsType> = ({friends}) => {
    // const { Search } = Input;
    //
    //
    //
    // const onSearch = (value: string) => {
    //     console.log(value)
    // };
    //
    // return (
    //     <Anchor style={{borderLeft:"none"}}>
    //            <Search placeholder="input search text" onSearch={onSearch} enterButton />
    //    </Anchor>
    // );
    const [options, setOptions] = React.useState<SelectProps<object>['options']>([]);

    const searchResult = (text: string) => {
        const result = friends.filter((f) => f.name.includes(text))
        return result.map(r => ({
            value: r.name,
            label: <NavLink to={'/dialog/' + r.id} key={r.id}>{r.name}</NavLink>
        }))
    }


    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
    };

    return (
        <Anchor style={{borderLeft: "none"}}>
            <AutoComplete
                dropdownMatchSelectWidth={300}
                style={{width: "inherit"}}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
            >
                <Input.Search size="middle" placeholder="find friend dialog" enterButton/>
            </AutoComplete>
        </Anchor>
    );

};

