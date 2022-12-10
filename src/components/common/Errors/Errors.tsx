import React from 'react';
import {notification} from 'antd';
import type {NotificationPlacement} from 'antd/es/notification/interface';

type ErrorsPropsType = {
    errorMessege: string | null
}
export const Errors: React.FC<ErrorsPropsType> = ({errorMessege}) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {

        api.error({
            message: `An error has occurred`,
            description:errorMessege,
            placement,
        });

    };
    errorMessege && openNotification('bottom')
    return (
        <>
            {contextHolder}



        </>
    );
};
