import React from 'react';
import Search from "antd/es/input/Search";

type SearchUserType = {
    getSearchUsers: (term: string) => void
    isLoading:boolean
}
export const SearchUser: React.FC<SearchUserType> = ({getSearchUsers,isLoading}) => {

    const onSearch = (value: string) => getSearchUsers && getSearchUsers(value)

    return (
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={onSearch}
            loading={isLoading}
            disabled={isLoading}
        />
    );
};

