import React from 'react';
import {Button, Result} from "antd";
import {useHistory} from "react-router-dom";
import {routes} from "../../Routes/Routes";

const Page404 = () => {

        let history = useHistory();

        const  handleClick=()=> {
            history.push(routes.profile);
        }
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={handleClick}>Back to Profile</Button>}
        />
    );
};

export default Page404;