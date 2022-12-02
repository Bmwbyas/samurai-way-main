import React, {createRef, useEffect, useRef} from "react";

import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import {Messege} from "./Messege/Messege";
import {UsersDataType} from "../../../Redux/users-reducer";


type DialogLastMessageType = {
    friends: UsersDataType[],
    addTochedUser: (data: { id: number, name: string }) => void
    myAvatar: string | null | undefined
    messege: string

}
export const DialogLastMessage: React.FC<DialogLastMessageType> = ({friends, addTochedUser, myAvatar, messege}) => {

    const standartPortion = 7
    const [sizePortion, setSizePortion] = React.useState(standartPortion)
    const friendPortion = friends.slice(0, sizePortion)

    const totalCountFriends = friends.length

    const lastItem = createRef<Element | null>();

    const observerLoader = useRef<null | IntersectionObserver>(null);

    const actionInSight = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && totalCountFriends / sizePortion > 1) {
            setSizePortion(sizePortion + standartPortion);
        }
    };

    useEffect(() => {
        if (observerLoader.current) {
            observerLoader.current.disconnect()
        }

        observerLoader.current = new IntersectionObserver(actionInSight);
        if (lastItem.current) observerLoader.current.observe(lastItem.current);
    }, [lastItem]);
    const messeges = friendPortion.map((f, index) => {
        const myAvatarValue = viewAvatar(myAvatar)
        const avatar = viewAvatar(f.photos.small)
        if (index + 1 === friendPortion.length) {
            return <Messege key={f.id} addTochedUser={addTochedUser} avatar={avatar} ref={lastItem}
                            myAvatarValue={myAvatarValue} f={f}
                            messege={messege}/>;
        }
        return <Messege key={f.id} addTochedUser={addTochedUser} avatar={avatar} myAvatarValue={myAvatarValue} f={f}
                        messege={messege}/>;

    })
    return <>{messeges}</>

};




