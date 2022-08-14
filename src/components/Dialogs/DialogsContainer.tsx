import React from 'react';


import {addMessageActionCreator, onChangeMessageHandlerActionCreator} from "../../Redux/dialogs-reduser";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {StateType} from "../../Redux/redux-store";

// type DialogsPropsType = {
//     // store: StoreType
// }
// export const DialogsContainer = (props: DialogsPropsType) => {
//
//     // const addMessageHandler = () => {
//     //     props.store.dispatch(addMessageActionCreator())
//     // }
//     // const onChangeMessageHandler = (text: string) => {
//     //
//     //     if (text) props.store.dispatch(onChangeMessageHandlerActionCreator(text))
//     // }
//     return (
//         <StoreContext.Consumer>{(store) => {
//             const addMessageHandler = () => {
//                 store.dispatch(addMessageActionCreator())
//             }
//             const onChangeMessageHandler = (text: string) => {
//
//                store.dispatch(onChangeMessageHandlerActionCreator(text))
//             }
//             return (<Dialogs
//                 addMessage={addMessageHandler}
//
//                 updateNewMessage={onChangeMessageHandler}
//                 dialogsPage={store.getState().dialogsPage}
//             />
//             )
//         }
//         }
//         </StoreContext.Consumer>
//     );
// }
let mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch:any) => {
    return {
        addMessage:()=>{ dispatch(addMessageActionCreator())},
        updateNewMessage:(text:string)=>{ dispatch(onChangeMessageHandlerActionCreator(text))}
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);