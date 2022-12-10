import {Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import React from "react";
import SingleUser from "../../common/SingleUser/SingleUser";
import {UsersDataType} from "../../../Redux/users-reducer";
import s from './FriendsList.module.css'
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import {routes} from "../../../Routes/Routes";

type FriendsListType = {
    friends: UsersDataType[]
    addTochedUser: (data: { id: number, name: string }) => void
    followingInProgress:number[]
    changeFollowUnfollow:(user:UsersDataType)=>void
    isOwner:boolean

}
export const FriendsList: React.FC<FriendsListType> = ({friends,addTochedUser,
                                                           changeFollowUnfollow,followingInProgress,isOwner}) => {
    const standartPortion = 7
    const [sizePortion, setSizePortion] = React.useState(standartPortion)
    const [prevSizePortion, setPrevSizePortion] = React.useState(0)

    const friendPortion = friends.slice(prevSizePortion, sizePortion)

    const totalCountFriends = friends.length

    const showNextFriendsButton = totalCountFriends / sizePortion > 1
    const showPrevFriendsButton = prevSizePortion !== 0

    const prevPortion = () => {
        setPrevSizePortion(prevSizePortion - standartPortion)
        setSizePortion(sizePortion - standartPortion)
    }
    const nextPortion = () => {
        setSizePortion(sizePortion + standartPortion)
        setPrevSizePortion(prevSizePortion + standartPortion)
    }
    const friendsData = friendPortion.map((f) => {
        const avatar = viewAvatar(f.photos.small)
        return <SingleUser key={f.id} addTochedUser={addTochedUser} followingInProgress={followingInProgress}
                       unfriend={changeFollowUnfollow} isOwner={isOwner}
                           navigate={routes.toDialog} user={f} photo={avatar}/>
    })

    return (
        <Row align={"middle"}>
            <Col span={1}>
                {showPrevFriendsButton && <LeftOutlined
                    className={s.nextPrev} style={{fontSize: 20}} onClick={prevPortion}/>}
            </Col>
            <Col span={22}>
                <Row justify={"space-evenly"}> {friendsData}</Row>
            </Col>
            <Col span={1}>
                {showNextFriendsButton && <RightOutlined
                    className={s.nextPrev} onClick={nextPortion} style={{fontSize: 20}}/>}
            </Col>
        </Row>);
};

