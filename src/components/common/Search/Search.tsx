import React from 'react';
import s from './autoComlete.module.css';
import {Anchor, AutoComplete, Input, Row, SelectProps} from 'antd';
import {UsersDataType} from "../../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import sCommentForm from "../../Profile/MyPosts/CommentForm/CommentForm.module.css";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";

type SearchPropsType = {
    friends: UsersDataType[]
    addTochedUser: (data: { id: number, name: string }) => void
}
export const Search: React.FC<SearchPropsType> = ({friends, addTochedUser}) => {

    const [options, setOptions] = React.useState<SelectProps<object>['options']>([]);

    const searchResult = (text: string) => {
        const result = friends.filter((f) => f.name.toLowerCase().includes(text))

        return result.map(r => {
            const addTochedUserHandler = () => {
                addTochedUser({id: r.id, name: r.name})
            }
            const avatar = viewAvatar(r.photos.small)
            return ({
                value: r.name,
                label: <NavLink style={{color: "black"}} onClick={addTochedUserHandler} to={'/dialog/' + r.id}
                                key={r.id}>
                    <Row align={"middle"}>
                        <img className={sCommentForm.avatar} src={avatar} alt="avatar"/> <span
                        style={{paddingLeft: 5}}> {r.name}</span>
                    </Row>
                </NavLink>
            })
        })
    }

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    return (

        <Anchor>
            <AutoComplete
                options={options}
                className={s.autoComlete}
                onSearch={handleSearch}
            >
                <Input.Search placeholder="find friend dialog" enterButton/>
            </AutoComplete>
        </Anchor>

    );

};

