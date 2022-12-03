import React from 'react';
import s from './Search.module.css';
import {Anchor, AutoComplete, Input, Row, SelectProps} from 'antd';
import {UsersDataType} from "../../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import sCommentForm from "../../Profile/MyPosts/CommentForm/CommentForm.module.css";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";

type SearchPropsType = {
    data: UsersDataType[]
    addTochedUser?: (data: { id: number, name: string }) => void
    placeholder:string
    getSearchUsers?:(term:string)=>void
}
export const SearchAutoComplite: React.FC<SearchPropsType> = ({data, addTochedUser,placeholder,getSearchUsers}) => {

    const [options, setOptions] = React.useState<SelectProps<object>['options']>([]);

    const searchResult = (text: string) => {
        const result = data.filter((f) => f.name.toLowerCase().includes(text))

        return result.map(r => {
            const addTochedUserHandler = () => {
                addTochedUser && addTochedUser({id: r.id, name: r.name})
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

    const handleSearch =  (value: string) => {

         setOptions(value ? searchResult(value) : []);
    };
    const onSelect = (value: string) => {
        getSearchUsers && getSearchUsers(value)
    };

    return (

        <Anchor>
            <AutoComplete
                options={options}
                className={s.autoComlete}
                onSearch={handleSearch}
                onSelect={onSelect}
            >
                <Input.Search  placeholder={placeholder} enterButton/>
            </AutoComplete>
        </Anchor>

    );

};

