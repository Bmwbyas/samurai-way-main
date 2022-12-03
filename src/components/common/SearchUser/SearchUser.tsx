import React from 'react';
import Search from "antd/es/input/Search";

type SearchUserType = {
    getSearchUsers: (term: string) => void
}
export const SearchUser: React.FC<SearchUserType> = ({getSearchUsers}) => {

    const onSearch = (value: string) => getSearchUsers && getSearchUsers(value)

    return (
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={onSearch}
            loading={false}
        />
    );
};

