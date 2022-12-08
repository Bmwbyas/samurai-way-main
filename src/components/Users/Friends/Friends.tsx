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
}
export const Friends: React.FC<FriendsPropsType> = ({changeFriends, friends}) => {
    const standartPortion = 8
    const [sizePortion, setSizePortion] = React.useState(standartPortion)
    const friendPortion = friends.slice(0, sizePortion)
    const nextPortion = () => {
        setSizePortion(sizePortion + standartPortion)
    }
    const showNextFriendsButton = showMoreFriends(friends.length, sizePortion)

    const friendsData = friendPortion.map((f) => {
        const avatar = viewAvatar(f.photos.small)
        return <SingleUser key={f.id} unfriend={changeFriends} isFriends={true}
                           user={f} navigate={routes.toProfile} photo={avatar}/>
    })

    return (<>
            <div className={sProfilePage.profileInfoContainer}>
                <Row>My friends {friends.length + 1}</Row>
                <Row>{friendsData}</Row>
                {showNextFriendsButton && <Row justify={"center"}>
                    <Button style={{marginBottom: 15}} type={'primary'} onClick={nextPortion}>
                        Show more
                        friends <PlusCircleOutlined/>
                    </Button> </Row>}
            </div>

        </>
    );
};

