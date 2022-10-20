import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusPropsType = {
    newStatus: string
    updateProfileStatus: (status: string) => void
}


export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = ({
                                                                             newStatus,
                                                                             updateProfileStatus,
                                                                             ...restProps
                                                                         }) => {
    const [status, setStatus] = useState(newStatus)
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const disableEditMode = () => {
        setEditMode(false)
        updateProfileStatus(status)
    }

    const changeInputStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(()=>{
        if(newStatus!==status){
        setStatus(newStatus)
        }
    },[newStatus])

    // componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: ProfileStatusStateType) {
    //     if (prevProps.newStatus !== this.props.newStatus) {
    //         this.setState({status: this.props.newStatus})
    //     }
    // }


    return (
        <div>
            {editMode
                ? <input
                    value={status}
                    autoFocus={true}
                    onChange={changeInputStatus}
                    onBlur={disableEditMode}
                />
                : <div onDoubleClick={activateEditMode}><span>{status}</span></div>}
        </div>
    );

}
