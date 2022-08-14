import {StateType} from "../../Redux/redux-store";
import {addMessageActionCreator, onChangeMessageHandlerActionCreator} from "../../Redux/dialogs-reduser";
import {connect} from "react-redux";
import {Dialogs} from "../Dialogs/Dialogs";
import {Navbar} from "./Navbar";

let mapStateToProps = (state: StateType) => {
    return {
        navbarPage: state.navbarPage
    }
}
let mapDispatchToProps = (dispatch:any) => {
    return {

    }
}
export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);