import React from 'react';
import Search from "antd/es/input/Search";

type SearchUserType = {
    getSearchUsers: (term: string) => void
    isLoading:boolean
    defaultSearchValue:string|null|undefined
    placeholder:string

}
export const SearchUser: React.FC<SearchUserType> = React.memo(({getSearchUsers,isLoading,placeholder,defaultSearchValue}) => {

    const onSearch = (value: string) => getSearchUsers && getSearchUsers(value)
    const defaultValue=defaultSearchValue??undefined
    return (
        <Search
            defaultValue={defaultValue}
            placeholder={placeholder}
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={onSearch}
            loading={isLoading}
            disabled={isLoading}
        />
    );
});

