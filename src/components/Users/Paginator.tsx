import React, {useState} from 'react';
import s from "./Users.module.css";


type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (p: number) => void
    portionSize:number
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {totalItemsCount, currentPage, pageSize, setCurrentPage,portionSize}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount=Math.ceil(pagesCount/portionSize)
    let [portionNumber,setPortionNumber]=useState(1)
    let leftPortionPageNumber=(portionNumber-1)*portionSize+1
    let rightPortionPageNumber=portionNumber*portionSize

const prevPortion=()=>{
        setPortionNumber(portionNumber-1)
}
    const nextPortion=()=>{
        setPortionNumber(portionNumber+1)
    }
    return (
        <>
            <div style={{padding: '10px', fontSize: '20px'}}>Users</div>
            <div>
                {portionNumber>1&&<button onClick={prevPortion}>prev</button>}
                {pages.filter(p=>p>=leftPortionPageNumber&&p<=rightPortionPageNumber).map(p => {
                    return <span
                        key={p}
                        className={`${currentPage === p ? s.selectedPage : ''} ${s.span}`}
                        onClick={() => setCurrentPage(p)}
                    >{p}</span>
                })}
                {portionSize>portionNumber&&<button onClick={nextPortion}>next</button>}
            </div>

        </>

    );
};


