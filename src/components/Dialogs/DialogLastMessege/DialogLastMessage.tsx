import React from 'react';
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import {Messege} from "../Messege/Messege";
import {UsersDataType} from "../../../Redux/users-reducer";

type DialogLastMessageType = {
    friends: UsersDataType[],
    addTochedUser: (data: { id: number, name: string }) => void
    myAvatar: string | null | undefined
    messege: string

}
export const DialogLastMessage: React.FC<DialogLastMessageType> = ({friends, addTochedUser, myAvatar, messege}) => {
    const messeges = friends.map((f) => {
        const myAvatarValue = viewAvatar(myAvatar)
        const avatar = viewAvatar(f.photos.small)

        return <Messege key={f.id} addTochedUser={addTochedUser} avatar={avatar} myAvatarValue={myAvatarValue} f={f}
                        messege={messege}/>
    })
    return <>{messeges}</>
};

