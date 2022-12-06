import React from 'react';
import Search from "antd/es/input/Search";

type SearchUserType = {
    getSearchUsers: (term: string) => void
    isLoading:boolean
    defaultSearchValue:string|null|undefined

}
export const SearchUser: React.FC<SearchUserType> = ({getSearchUsers,isLoading,defaultSearchValue}) => {

    const onSearch = (value: string) => getSearchUsers && getSearchUsers(value)
    const defaultValue=defaultSearchValue??undefined
    return (
        <Search
            defaultValue={defaultValue}
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

