import {Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import React from "react";
import SingleUser from "../../common/SingleUser/SingleUser";
import {UsersDataType} from "../../../Redux/users-reducer";
import s from './FriendsList.module.css'
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";

type FriendsListType = {
    friends: UsersDataType[]
    addTochedUser: (data: { id: number, name: string }) => void
}
export const FriendsList: React.FC<FriendsListType> = ({friends,addTochedUser}) => {
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
        return <SingleUser key={f.id} addTochedUser={addTochedUser} navigate={'/dialog/'} id={f.id} name={f.name} photo={avatar}/>
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

