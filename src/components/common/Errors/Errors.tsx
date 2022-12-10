import React from 'react';
import {notification} from 'antd';
import type {NotificationPlacement} from 'antd/es/notification/interface';

type ErrorsPropsType = {
    errorMessege: string | null
    setError:(error:{error:string|null})=>void
}
export const Errors: React.FC<ErrorsPropsType> = ({errorMessege,setError}) => {
    const [api, contextHolder] = notification.useNotification();

    console.log('error component')
    const openNotification = (placement: NotificationPlacement) => {

        api.error({
            message: `An error has occurred`,
            description:errorMessege,
            placement,
            onClose: () => {
                setError({error:null})
            }
        });


    };
    errorMessege && openNotification('bottom')
    return (
        <>
            {contextHolder}
        </>
    );
};
