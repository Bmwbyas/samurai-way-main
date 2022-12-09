import React from 'react';
import {UsersDataType} from "../../../Redux/users-reducer";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import SingleUser from "../../common/SingleUser/SingleUser";
import {routes} from "../../../Routes/Routes";
import s from "../Profile.module.css";
import {Button, Row} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {showMoreFriends} from "../../../utils/Pagination/showMoreFriends";

type FriendsProfilePropsType={
    friends:UsersDataType[]
    changeFollowUnfollow:(user: UsersDataType) => void
    isOwner:boolean
}

export const FriendsListProfile:React.FC<FriendsProfilePropsType> = ({friends,changeFollowUnfollow,isOwner}) => {

    const [sizePortion, setSizePortion] = React.useState(4)

    const friendPortion = friends.slice(0, sizePortion)

    const friendsData=friendPortion.map((f) => {
        const avatar = viewAvatar(f.photos.small)
        return <SingleUser key={f.id} unfriend={changeFollowUnfollow} navigate={routes.toProfile} user={f}
                           photo={avatar} isOwner={isOwner}/>
    })


    const showMoreUser = () => {
        setSizePortion(sizePortion + 4)
    }
    const showButtonMoreFriends = showMoreFriends(friends.length,sizePortion)

    return (
        <div className={s.profileInfoContainer}>

            <Row justify={"center"}><h1>Friends</h1></Row>
            <Row justify={"center"}>

                <Row>{friendsData}</Row>
                {showButtonMoreFriends && <Row justify={"end"}>
                    <Button style={{marginBottom: 15}} type={'primary'} onClick={showMoreUser}>Show more
                        friends <PlusCircleOutlined/>
                    </Button>
                </Row>
                }
            </Row>
        </div>
    );
};
