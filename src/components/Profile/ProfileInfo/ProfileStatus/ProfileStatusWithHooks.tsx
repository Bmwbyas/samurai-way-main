import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileStatusWithHooks.module.css'

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

    return (
        <div className={s.vievStatus}>
            {editMode
                ? <input
                    value={status}
                    autoFocus={true}
                    onChange={changeInputStatus}
                    onBlur={disableEditMode}
                />
                : <div  onClick={activateEditMode} ><span><b>Status</b>: {status}</span></div>}
        </div>
    );

}
