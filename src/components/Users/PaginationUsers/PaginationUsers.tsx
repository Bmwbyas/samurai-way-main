import React from 'react';
import {Pagination} from "antd";
type PaginationUsersPropsType={
    pageSize:number|undefined
    currentPage:number|undefined
    updateUsersData:(data:{page:number,count:number})=>void
    totalUsersCount:number
}
export const PaginationUsers:React.FC<PaginationUsersPropsType> =({updateUsersData,totalUsersCount,
                                                                       pageSize,currentPage
}) => {
    const onChangePaginationValue = (page: number, pageSize: number) => updateUsersData({page, count: pageSize})
    const pageSizeOptions = () => {

        if (pageSize) {
            return [pageSize, pageSize * 2, pageSize * 3, pageSize * 4, pageSize * 10]
        } else {
            return [10, 20, 30, 40]
        }

    }
    return (
        <Pagination defaultCurrent={currentPage} onChange={onChangePaginationValue}
                    hideOnSinglePage={true}
                    showTitle={false}
                    current={currentPage}
                    defaultPageSize={pageSize} total={totalUsersCount}
                    pageSizeOptions={pageSizeOptions()}/>
    );
};

