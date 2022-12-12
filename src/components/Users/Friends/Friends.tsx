import React from 'react';
import sProfilePage from "../../Profile/Profile.module.css";
import {Button, Row} from "antd";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import SingleUser from "../../common/SingleUser/SingleUser";
import {routes} from "../../../Routes/Routes";
import {UsersDataType} from "../../../Redux/users-reducer";
import {PlusCircleOutlined} from "@ant-design/icons";
import {showMoreFriends} from "../../../utils/Pagination/showMoreFriends";

type FriendsPropsType = {
    friends: UsersDataType[]
    changeFriends: (user: UsersDataType) => void
    isOwner:boolean
    followingInProgress:number[]
}
export const Friends: React.FC<FriendsPropsType> = React.memo(({changeFriends, friends,
                                                        isOwner,followingInProgress}) => {
    const standartPortion = 8
    const [sizePortion, setSizePortion] = React.useState(standartPortion)
    const friendPortion = friends.slice(0, sizePortion)
    const nextPortion = () => {
        setSizePortion(sizePortion + standartPortion)
    }
    console.log('friends')
    const showNextFriendsButton = showMoreFriends(friends.length, sizePortion)

    const friendsData = friendPortion.map((f) => {
        const avatar = viewAvatar(f.photos.small)
        return <SingleUser key={f.id} unfriend={changeFriends}
                           user={f} navigate={routes.toProfile} followingInProgress={followingInProgress} photo={avatar} isOwner={isOwner}/>
    })

    return (<>
            <div className={sProfilePage.profileInfoContainer}>
                <Row style={{marginBottom:10}}>My friends {friends.length }</Row>
                <Row >
                    {friendsData.length===0?
                    'Empty'
                    :friendsData}
                </Row>
                {showNextFriendsButton && <Row justify={"center"}>
                    <Button style={{marginBottom: 15}} type={'primary'} onClick={nextPortion}>
                        Show more
                        friends <PlusCircleOutlined/>
                    </Button> </Row>}
            </div>

        </>
    );
});

