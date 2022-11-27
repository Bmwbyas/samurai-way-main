import React from 'react';
import {LikeOutlined} from "@ant-design/icons";
import {Button} from "antd";
type LikeButtonType={
    likesCount:number
    toggleLike:(like:number) =>void
}

const LikeButton:React.FC<LikeButtonType> = ({likesCount,toggleLike}) => {
    const [like,setLike]=React.useState(true)
    const onClickHandler=()=>{
        if(like)toggleLike(1)
        else toggleLike(-1)
        setLike(!like)

    }
    return (

            <Button onClick={onClickHandler} type="default">
                <LikeOutlined/> <span>{likesCount}</span>
            </Button>

    );
};

export default LikeButton;